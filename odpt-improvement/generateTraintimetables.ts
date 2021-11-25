import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { parseArray } from "https://deno.land/x/postgres@v0.13.0/query/array_parser.ts";
import { FinalLeg, missingFinalConnections, processFinalStations } from "./finalLegProcessor.ts";
import { Interval } from "./interval.ts";
import {
  getTimetableType,
  processDecreasingTimetable,
  processIncreasingTimetable,
  TimetableType,
} from "./timetableCleaner.ts";
import { nextStopConnections } from "./trainConnections.ts";
import { groupBy } from "./utils.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

const now = new Date().toISOString();
let timetableGeneratedIndex = 0;

export type OdptTimetable = {
  station: string;
  calendar: string;
  issued: Date;
  operator: string;
  // deno-lint-ignore camelcase
  train_type: string;
  train: string | null;
  // deno-lint-ignore camelcase
  train_number: string | null;
  // deno-lint-ignore camelcase
  destination_station: string[];
  // deno-lint-ignore camelcase
  train_name: string | null;
  // deno-lint-ignore camelcase
  via_railway: string[] | null;
  // deno-lint-ignore camelcase
  departure_time: Interval[];
  // deno-lint-ignore camelcase
  is_last: (boolean | null)[];
  // deno-lint-ignore camelcase
  is_origin: (boolean | null)[];
  // deno-lint-ignore camelcase
  is_train_origin: (boolean | null)[];
  note: string | null;
};

interface Timetable {
  departureTime: Interval;
  station: string;
  index: number;
  isOrigin: boolean;
}

const { rows: allRrailways } = await client.queryArray<[string]>`
select distinct st.railway
from odpt.station_timetable st
left join odpt.train_timetable_object tto on st.station = COALESCE(tto.arrival_station, tto.departure_station)
where tto.train_timetable is null;
`;

async function assertNoOtherDirectionsExist(
  railway: string,
  directions: string[]
): Promise<void> {
  const { rowCount, rows: unexpectedDirections } = await client.queryArray<
    [string]
  >`
select distinct rail_direction
from odpt.station_timetable
where railway = ${railway} and rail_direction <> all(${directions});
`;

  if (rowCount !== 0) {
    throw new Error(
      `Unexpected directions ${unexpectedDirections.flat()} for railway ${railway}`
    );
  }
}

const missingFinals = new Set<string>();

async function processDirection(
  railway: string,
  direction: string,
  stations: string[]
): Promise<{ finalLegs: FinalLeg[] }> {
  console.log(`Processing: ${direction}`);
  const finalLegs: FinalLeg[] = [];

  if (railway === "Tokyu.Oimachi" && direction == "Outbound") {
    stations.splice(
      stations.indexOf("Tokyu.Oimachi.Mizonokuchi"),
      0,
      "Tokyu.DenEnToshi.FutakoShinchi",
      "Tokyu.DenEnToshi.Takatsu"
    );
  } else if (railway === "Tokyu.Oimachi" && direction == "Inbound") {
    stations.splice(
      stations.indexOf("Tokyu.Oimachi.FutakoTamagawa"),
      0,
      "Tokyu.DenEnToshi.Takatsu",
      "Tokyu.DenEnToshi.FutakoShinchi"
    );
  }

  const { rows } = await client.queryObject<
    OdptTimetable & { departure_time: string }
  >`
select st.station,
       st.calendar,
       st.issued,
       st.operator,
       sto.train, 
       sto.train_type, 
       sto.train_number, 
       sto.destination_station, 
       sto.train_name[1] -> 'ja' as train_name, 
       sto.via_railway, 
       array_agg(sto.departure_time order by sto.departure_time asc) as departure_time, 
       array_agg(sto.is_last order by sto.departure_time asc) as is_last, 
       array_agg(sto.is_origin order by sto.departure_time asc) as is_origin, 
       array_agg(sto.is_origin order by sto.departure_time asc) as is_train_origin, 
       sto.note -> 'ja' as note
from odpt.station_timetable st
left join odpt.station_timetable_object sto on sto.station_timetable = st.id
where st.railway = ${railway} and st.rail_direction = ${direction}
group by st.station, st.calendar, st.issued, st.operator, sto.train, sto.train_type, 
  sto.train_number, sto.destination_station, sto.train_name, sto.via_railway, sto.note
`;

  for (const [key, groupedRows] of Object.entries(
    groupBy(
      rows.map(
        (r) =>
          ({
            ...r,
            departure_time: parseArray(r.departure_time, Interval.parse),
          } as OdptTimetable)
      ),
      (r) =>
        `${r.calendar}_${r.train}_${r.train_type}_${r.train_number}_${r.destination_station}_${r.train_name}_${r.via_railway}_${r.note}`
    )
  )) {
    groupedRows.sort(
      (a, b) => stations.indexOf(a.station) - stations.indexOf(b.station)
    );

    let type = getTimetableType(groupedRows);

    if (type === TimetableType.COMPLEX_INCREASING) {
      const isSimple = await processIncreasingTimetable(
        railway,
        direction,
        groupedRows
      );
      if (isSimple) {
        type = TimetableType.SIMPLE;
      } else {
        console.log("unable to fix increasing ", key);
      }
    }

    if (type === TimetableType.COMPLEX_DECREASING) {
      const isSimple = await processDecreasingTimetable(
        railway,
        direction,
        groupedRows
      );
      if (isSimple) {
        type = TimetableType.SIMPLE;
      } else {
        console.log("unable to fix decreasing ", key);
      }
    }

    if (type !== TimetableType.SIMPLE) {
      continue;
    }

    const lastIndex = groupedRows.length - 1;
    const timetables: Timetable[][] = [];

    while (groupedRows[lastIndex].departure_time.length > 0) {
      const timetable: Timetable[] = [];
      timetables.push(timetable);
      for (let i = lastIndex; i > -1; i--) {
        const departureTime = groupedRows[i].departure_time.pop();
        if (departureTime === undefined) {
          console.error("Missing time at end of:", groupedRows[i]);
          break;
        }
        const isOrigin = groupedRows[i].is_origin.pop();
        const isTrainOrigin = groupedRows[i].is_train_origin.pop();
        timetable.push({
          departureTime,
          station: groupedRows[i].station,
          index: i,
          isOrigin: isTrainOrigin === true,
        });
        if (isOrigin) {
          break;
        }
      }
    }

    const first = groupedRows[0];

    let destinationOnSameRailway;
    if (first.destination_station.length === 1) {
      const destinationRailway = await client.queryArray<
        [string]
      >`select railway from odpt.station where id = ${first.destination_station[0]}`;
      if (destinationRailway.rows[0] == null) {
        console.log(first.destination_station);
        destinationOnSameRailway = false;
      } else {
        destinationOnSameRailway = destinationRailway.rows[0][0] == railway;
      }
    } else {
      destinationOnSameRailway = false;
    }

    for (const timetable of timetables) {
      let previousDepartureTime = 0;
      for (const departureTime of timetable
        .slice()
        .reverse()
        .map((d) => d.departureTime)) {
        if (departureTime.valueOf() < previousDepartureTime) {
          console.log(timetable.slice().reverse());
          throw new Error("Timetables not increasing");
        } else {
          previousDepartureTime = departureTime.valueOf();
        }
      }

      const trainNumber = `Generated${timetableGeneratedIndex++}`;
      const train = `${railway}.${trainNumber}`;
      const id = `${train}.${first.calendar}`;

      let originStation = null;

      if (timetable[timetable.length - 1].isOrigin) {
        originStation = [timetable[timetable.length - 1].station];
      }

      await client.queryArray`insert into odpt.train_timetable (
        id, modified_at, issued, train, railway, calendar, operator, train_type, train_number, rail_direction, origin_station, destination_station, via_railway
      ) values (
        ${id}, ${now}, ${first.issued.toISOString()}, ${train}, ${railway}, ${
        first.calendar
      }, 
        ${first.operator}, ${
        first.train_type
      }, ${trainNumber}, ${direction}, ${originStation},
        ${first.destination_station}, ${first.via_railway}
      )`;

      for (const row of timetable.slice().reverse()) {
        const departureTime = row.departureTime.toJSON();
        await client.queryArray`insert into odpt.train_timetable_object (
            train_timetable, i, departure_time, departure_station
          ) values (
            ${id}, ${row.index}, ${departureTime}, ${row.station}
          )`;
      }

      const destinations = first.destination_station.join("/");
      const nextStation =
        nextStopConnections[timetable[0].station]?.[first.train_type]?.[
          destinations
        ];

      if (nextStation == null && destinationOnSameRailway && first.destination_station.length === 1) {
        finalLegs.push({
          id,
          index: timetable[0].index + 1,
          previousDepartureTime: timetable[0].departureTime,
          previousStation: timetable[0].station,
          station: first.destination_station[0],
          trainType: first.train_type,
          destinationStations: destinations,
          calendar: first.calendar,
          hasConnection: false,
          isOnSameRailway: true
        });
      } else if (nextStation == null) {
        console.log(
          `Could not find next station from ${timetable[0].station} with destination ${destinations} train type ${first.train_type}`
        );
        missingFinals.add(
          `${timetable[0].station}_${destinations}_${first.train_type}`
        );
      } else if(first.destination_station.length === 1 && nextStation === first.destination_station[0]) {
        finalLegs.push({
          id,
          index: timetable[0].index + 1,
          previousDepartureTime: timetable[0].departureTime,
          previousStation: timetable[0].station,
          station: first.destination_station[0],
          trainType: first.train_type,
          destinationStations: nextStation,
          calendar: first.calendar,
          hasConnection: false,
          isOnSameRailway: destinationOnSameRailway
        });
      } else if (destinationOnSameRailway) {
        finalLegs.push({
          id,
          index: timetable[0].index + 1,
          previousDepartureTime: timetable[0].departureTime,
          previousStation: timetable[0].station,
          station: nextStation,
          trainType: first.train_type,
          destinationStations: destinations,
          calendar: first.calendar,
          hasConnection: true,
          isOnSameRailway: true
        });
      } else {
        finalLegs.push({
          id,
          index: timetable[0].index + 1,
          previousDepartureTime: timetable[0].departureTime,
          previousStation: timetable[0].station,
          station: nextStation,
          trainType: first.train_type,
          destinationStations: destinations,
          calendar: first.calendar,
          hasConnection: true,
          isOnSameRailway: false
        });
      }
    }
  }
  return { finalLegs };
}

async function processRailway(id: string): Promise<FinalLeg[][]> {
  console.log(`Processing: ${id}`);
  const {
    rows: [[ascendingDirection, descendingDirection]],
  } = await client.queryArray<[string, string]>`
select ascending_rail_direction, descending_rail_direction
from odpt.railway
where id = ${id};`;

  const stations = (
    await client.queryArray<[number, string]>`
  select i, station
  from odpt.station_order
  where railway = ${id};`
  ).rows.reduce((a, [i, v]) => {
    a[i - 1] = v;
    return a;
  }, [] as string[]);

  const ascendingResult = await processDirection(id, ascendingDirection, [
    ...stations,
  ]);
  const descendingResult = await processDirection(
    id,
    descendingDirection,
    [...stations].reverse()
  );

  await assertNoOtherDirectionsExist(id, [
    ascendingDirection,
    descendingDirection,
  ]);

  return [ascendingResult.finalLegs, descendingResult.finalLegs];
}

const finalLegs: FinalLeg[][] = [];

for (const r of allRrailways.flat()) {
  finalLegs.push(...(await processRailway(r)));
}

for (const f of finalLegs) {
  await processFinalStations(f);
}

const missingOutput: Record<
  string,
  Record<string, Record<string, number>>
> = {};

for (const missing of missingFinals) {
  const [a, b, c] = missing.split("_");
  if (!(a in missingOutput)) {
    missingOutput[a] = {};
  }
  if (!(c in missingOutput[a])) {
    missingOutput[a][c] = {};
  }
  missingOutput[a][c][b] = -1;
}

// Deno.writeTextFile("missingFinals.txt", JSON.stringify(missingOutput, null, 2));


const missingConnectionsOutput: Record<
  string,
  Record<string, Record<string, number>>
> = {};

for (const missing of missingFinalConnections) {
  const [a, b, c] = missing.split("_");
  if (!(a in missingConnectionsOutput)) {
    missingConnectionsOutput[a] = {};
  }
  if (!(b in missingConnectionsOutput[a])) {
    missingConnectionsOutput[a][b] = {};
  }
  missingConnectionsOutput[a][b][c] = -1;
}


// Deno.writeTextFile("missingFinalConnections.txt", JSON.stringify(missingConnectionsOutput, null, 2));



console.log(timetableGeneratedIndex);
