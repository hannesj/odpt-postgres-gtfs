import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { finalConnections } from "./finalConnections.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

interface Row {
  id: string;
  station: string;
  train_type: string;
  destination_station: string[];
  calendar: string;
  time: string;
}

async function fetchRows(): Promise<Row[]> {
  const res = await client.queryObject<Row>`
  select 
    tt.id as id,
    coalesce(tto.departure_station, tto.arrival_station) as station, 
    train_type, 
    destination_station, 
    calendar,
    coalesce(departure_time, arrival_time) as time
  from odpt.train_timetable tt
  inner join odpt.train_timetable_max_index maxindex on tt.id = maxindex.id
  inner join odpt.train_timetable_object tto on tto.train_timetable = tt.id and maxindex.i = tto.i
  where destination_station[1] != coalesce(tto.departure_station, tto.arrival_station)
  and next_train_timetable is null
  order by coalesce(departure_time, arrival_time) desc`;

  return res.rows;
}

const missingFinalConnections: Set<string> = new Set();

async function findTrainConnection(
  row: Row,
  connectingStation: string
): Promise<void> {
  const res = await client.queryObject<{ id: string }>`
  select tt.id
  from odpt.train_timetable tt
  inner join odpt.train_timetable_object tto on tto.train_timetable = tt.id
  inner join odpt.train_timetable_min_index minindex on tt.id = minindex.id
  where tt.destination_station = ${row.destination_station}
    and coalesce(tto.departure_station, tto.arrival_station) = ${connectingStation}
    and tt.calendar = ${row.calendar}
    and previous_train_timetable is null
    and tto.i = minindex.i
    and (origin_station is null or origin_station[1] != ${connectingStation})
    and coalesce(departure_time, arrival_time) >= ${row.time}
  order by coalesce(departure_time, arrival_time) asc
  limit 1`;

  if (res.rows.length != 1) {
    console.log("could not find connection for ", {...row, connectingStation});
  } else {
    await client.queryArray`update odpt.train_timetable set next_train_timetable = ${[
      res.rows[0].id,
    ]} where id = ${row.id}`;
    await client.queryArray`update odpt.train_timetable set previous_train_timetable = ${[
      row.id,
    ]} where id = ${res.rows[0].id}`;
  }
}

for (const row of await fetchRows()) {
  const connectingStation =
    finalConnections[row.station]?.[row.train_type]?.[
      row.destination_station.join("/")
    ];
  if (connectingStation === undefined) {
    console.log(`Missing final connection ${row.station}_${row.train_type}_${row.destination_station.join("/")}`)
    missingFinalConnections.add(
      `${row.station}_${row.train_type}_${row.destination_station.join("/")}`
    );
  } else if (connectingStation === null) {
    continue;
  } else {
    if (
      row.station === "Toei.Asakusa.Oshiage" &&
      connectingStation === "Keisei.Oshiage.Oshiage" &&
      row.destination_station.length === 1 &&
      row.destination_station[0] === "Hokuso.Hokuso.ImbaNihonIdai"
    ) {
      row.destination_station = ["Keisei.NaritaSkyAccess.ImbaNihonIdai"];
    }
    await findTrainConnection(row, connectingStation);
  }
}

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
