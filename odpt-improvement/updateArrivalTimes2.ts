import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { decodeStringArray } from "https://deno.land/x/postgres@v0.13.0/query/decoders.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

const res = await client.queryObject<{
  train_timetable: string,
  i: number,
  id: string,
  next_train_timetable: string[],
  next_stations: string[],
  next_times: string,
  distance: string[]
}>`
SELECT o1.train_timetable,
  o1.i,
  s1.id,
  tt.next_train_timetable,
  array_agg(o2.departure_station) as next_stations,
  array_agg(o2.departure_time) as next_times,
  array_agg(ST_Distance(s1.location, s2.location)) as distance
from odpt.train_timetable_object o1
left join odpt.train_timetable tt on o1.train_timetable = tt.id
left join odpt.station s1 on o1.arrival_station = s1.id
left join odpt.train_timetable_object o2 on o2.train_timetable = any(tt.next_train_timetable) and o2.i = 0
left join odpt.station s2 on o2.departure_station = s2.id
where o1.arrival_station is not null
  and o1.arrival_time is null
group by o1.train_timetable, o1.i, s1.id, tt.next_train_timetable;
`

for (const row of res.rows) {
  if (row.distance.some(d => d !== "0")) {
    throw new Error("Unexpected distance")
  }
  if (typeof row.next_times !== "string") {
    throw new Error("Unexpected next_times")
  }
  const nextTimes = decodeStringArray(row.next_times)
  if (!nextTimes) {
    throw new Error("Unexpected next_times")
  }
  const arrivalTime = nextTimes.sort()[0]
  if (typeof arrivalTime !== "string") {
    throw new Error("Unexpected next_times")
  }
  console.log(await client.queryArray`
    UPDATE odpt.train_timetable_object
    SET arrival_time = ${arrivalTime}
    WHERE train_timetable = ${row.train_timetable}
      AND i = ${row.i}
  `)
}