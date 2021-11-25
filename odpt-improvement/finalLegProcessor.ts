import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { finalConnections } from "./finalConnections.ts";
import { OdptTimetable } from "./generateTraintimetables.ts";
import { Interval } from "./interval.ts";
import { createdConnections } from "./timetableCleaner.ts";
import { Connection } from "./trainConnections.ts";
import { getDurationBetweenStops } from "./travelTimes.ts";
import { groupBy } from "./utils.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

export interface FinalLeg {
  id: string;
  index: number;
  previousDepartureTime: Interval;
  previousStation: string;
  station: string;
  trainType: string;
  destinationStations: string;
  calendar: string;
  hasConnection: boolean;
  isOnSameRailway: boolean;
}

export const missingFinalConnections: Set<string> = new Set();

export async function processFinalStations(
  finalLegs: FinalLeg[]
): Promise<void> {
  for (const [finalStation, group1] of Object.entries(
    groupBy(finalLegs, "station")
  )) {
    for (const [previousStation, group2] of Object.entries(
      groupBy(group1, "previousStation")
    )) {
      for (const [trainType, group3] of Object.entries(
        groupBy(group2, "trainType")
      )) {
        for (const [hasConnection, group4] of Object.entries(
          groupBy(group3, "hasConnection")
        )) {
          try {
            const time = await getDurationBetweenStops(
              previousStation,
              finalStation,
              trainType
            );
            if (hasConnection === "false") {
              for (const row of group4) {
                const arrivalTime = row.previousDepartureTime.addSeconds(time);

                await insertTimetableObject(row, arrivalTime);
              }
            } else {
              for (const [destinationStations, group5] of Object.entries(
                groupBy(group4, "destinationStations")
              )) {
                for (const [calendar, groupedRows] of Object.entries(
                  groupBy(group5, "calendar")
                )) {
                  const potentialConnections = createdConnections.filter(
                    ([connection, timetable]) =>
                      connection.station === previousStation &&
                      connection.train_type === trainType &&
                      connection.destination_station.join("/") ===
                        destinationStations &&
                      timetable.calendar === calendar
                  );

                  if (potentialConnections.length === groupedRows.length) {
                    const sortedConnections = potentialConnections.sort(
                      ([, , timeA], [, , timeB]) =>
                        timeA.valueOf() - timeB.valueOf()
                    );

                    const sortedRows = groupedRows.sort(
                      (a, b) =>
                        a.previousDepartureTime.valueOf() -
                        b.previousDepartureTime.valueOf()
                    );

                    for (let i = 0; i < sortedRows.length; i++) {
                      const usingCalculatedTime =
                        sortedRows[i].previousDepartureTime.addSeconds(time);
                      const usingDepartureTime = sortedConnections[i][2];

                      const arrivalTime =
                        usingCalculatedTime > usingDepartureTime
                          ? usingDepartureTime
                          : usingCalculatedTime;

                      await insertTimetableObject(sortedRows[i], arrivalTime);
                      await addTrainConnection(
                        sortedRows[i].id,
                        sortedConnections[i]
                      );
                    }
                  } else {
                    for (const finalLeg of groupedRows) {
                      const connectingStation = finalConnections[finalLeg.station]?.[finalLeg.trainType]?.[finalLeg.destinationStations];
                      if (connectingStation === undefined) {
                        console.log(`Missing final connection ${finalLeg.station}_${finalLeg.trainType}_${finalLeg.destinationStations}`)
                        missingFinalConnections.add(
                          `${finalLeg.station}_${finalLeg.trainType}_${finalLeg.destinationStations}`
                        );
                      } else if (connectingStation === null) {
                        const arrivalTime = finalLeg.previousDepartureTime.addSeconds(time);
                        await insertTimetableObject(finalLeg, arrivalTime);
                      } else {
                        await findTrainConnection(finalLeg, connectingStation, time);
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}

function insertTimetableObject(row: FinalLeg, arrivalTime: Interval) {
  return client.queryArray`
  insert into odpt.train_timetable_object 
    (train_timetable, i, arrival_time, arrival_station)
  values 
    (${row.id}, ${row.index}, ${arrivalTime}, ${row.station})
  `;
}

async function addTrainConnection(
  fromId: string,
  toConnection: [Connection, OdptTimetable, Interval]
) {
  const toId = await client.queryObject<{ id: string }>`
  select tt.id from odpt.train_timetable_object tto
  inner join odpt.train_timetable tt on tt.id = tto.train_timetable
  left join odpt.train_timetable_object tto0 on tto.train_timetable = tto0.train_timetable and tto.i = tto0.i + 1
  where tt.calendar = ${toConnection[1].calendar}
    and tto.departure_station = ${toConnection[1].station}
    and tt.destination_station = ${toConnection[1].destination_station}
    and tt.train_type = ${toConnection[1].train_type}
    and tto.departure_time = ${toConnection[2]}
    and tto0.train_timetable is null
    and tt.previous_train_timetable is null
    and tt.origin_station is null
  limit 1
  `;

  if (toId.rowCount != 1) {
    console.log(
      "unexpected row count (addTrainConnection) ",
      toConnection,
      toId.rows
    );
  } else {
    await client.queryArray`
      update odpt.train_timetable
      set next_train_timetable = ${[toId.rows[0].id]}
      where id = ${fromId}
    `;

    await client.queryArray`
      update odpt.train_timetable
      set previous_train_timetable = ${[fromId]}
      where id = ${toId.rows[0].id}
    `;
  }
}

async function findTrainConnection(
  finalLeg: FinalLeg,
  station: string,
  travelTime: number
) {
  const approximateTime = finalLeg.previousDepartureTime.addSeconds(travelTime)

  const toId = await client.queryObject<{ id: string, time: string }>`
  select tt.id, coalesce(tto.arrival_time, tto.departure_time) as time from odpt.train_timetable_object tto
  inner join odpt.train_timetable tt on tt.id = tto.train_timetable
  inner join odpt.train_timetable_min_index mindex on tto.train_timetable = mindex.id and tto.i = mindex.i
  where tt.calendar = ${finalLeg.calendar}
    and (tto.departure_station = ${station} or tto.arrival_station = ${station})
    and tt.destination_station = ${finalLeg.destinationStations.split("/")}
    and tt.previous_train_timetable is null
    and coalesce(tto.arrival_time, tto.departure_time) > ${finalLeg.previousDepartureTime}
  order by abs(coalesce(tto.arrival_time, tto.departure_time) - ${approximateTime})
  limit 1
  `;

  if (toId.rows.length !== 1) {
    console.log("unexpected row count (findTrainConnection) ", finalLeg);
  } else {
    const time = Interval.parse(toId.rows[0].time).subtractSeconds(60)

    await insertTimetableObject(finalLeg, time < approximateTime ? time : approximateTime);

    await client.queryArray`
      update odpt.train_timetable
      set next_train_timetable = ${[toId.rows[0].id]}
      where id = ${finalLeg.id}
    `;
  }
}
