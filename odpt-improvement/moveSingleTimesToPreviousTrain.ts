import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

interface SingleStopRow {
  id: string;
  railway: string;
  // deno-lint-ignore camelcase
  rail_direction: string;
  i: number;
  arrival_station: string | null;
  departure_station: string | null;
  // deno-lint-ignore camelcase
  previous_train_timetable: string[] | null;
  // deno-lint-ignore camelcase
  next_train_timetable: string[] | null
}

async function getTimetablesWithSingleStop(): Promise<SingleStopRow[]> {
  const res = await client.queryObject<SingleStopRow>`select tt.*, tto.*
  from odpt.train_timetable tt
  inner join odpt.train_timetable_max_index maxindex on tt.id = maxindex.id
  inner join odpt.train_timetable_min_index minindex on tt.id = minindex.id and maxindex.i = minindex.i
  inner join odpt.train_timetable_object tto on tt.id = tto.train_timetable and tto.i = maxindex.i`;
  return res.rows
}

async function getTrainTimetableWithLastRow(id: string): Promise<SingleStopRow | null> {
  const res = await client.queryObject<SingleStopRow>`select tt.*, tto.*
  from odpt.train_timetable tt
  inner join odpt.train_timetable_max_index maxindex on tt.id = maxindex.id
  inner join odpt.train_timetable_object tto on tt.id = tto.train_timetable and tto.i = maxindex.i
  where tt.id = ${id}`;
  return res.rows[0]
}

async function process() {
  for (const row of await getTimetablesWithSingleStop()) {
    if (row.next_train_timetable === null && row.previous_train_timetable !== null) {
      if (row.previous_train_timetable.length !== 1) {
        console.error("More than one previous row for:", row)
        continue;
      }
      const previous = await getTrainTimetableWithLastRow(row.previous_train_timetable[0])
      if (previous?.next_train_timetable?.length !== 1 || previous.next_train_timetable[0] != row.id) {
        console.error("Wrong previous train for", row, previous)
        continue;
      }
      const transaction = client.createTransaction(row.id);
      await transaction.begin();
      await transaction.queryObject`update odpt.train_timetable_object set train_timetable = ${previous.id}, i = ${previous.i + 1} where train_timetable = ${row.id} and i = ${row.i}`;
      await transaction.queryObject`update odpt.train_timetable set next_train_timetable = null where id = ${previous.id}`;
      await transaction.queryObject`delete from odpt.train_timetable where id = ${row.id}`;
      await transaction.commit();
    }
  }
}

process()