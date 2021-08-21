import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import type { OdptTimetable } from "./generateTraintimetables.ts";
import { Interval } from "./interval.ts";
import {
  Connection,
  extraConnectingLinesMap,
  findConnectionsFromConnectingLine,
  findConnectionsFromConnectingLineAtStation,
} from "./trainConnections.ts";
import { minConnectingTimes } from "./travelTimes.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

export enum TimetableType {
  SIMPLE,
  COMPLEX_INCREASING,
  COMPLEX_DECREASING,
}

export const createdConnections: [Connection, OdptTimetable, Interval][] = [];

export function getTimetableType([first, ...rows]: {
  departure_time: unknown[];
  is_origin: (boolean | null)[];
}[]): TimetableType {
  let origins = 0;
  const count = first.departure_time.length;
  let state = TimetableType.SIMPLE;
  for (const row of rows) {
    origins += row.is_origin.filter(Boolean).length;
    if (row.departure_time.length - origins > count) {
      state = TimetableType.COMPLEX_INCREASING;
    } else if (row.departure_time.length - origins < count) {
      return TimetableType.COMPLEX_DECREASING;
    }
  }
  return state;
}

export async function processIncreasingTimetable(
  railway: string,
  direction: string,
  [first, ...rows]: OdptTimetable[]
): Promise<boolean> {
  let origins = 0;
  const count = first.departure_time.length;
  let previous;
  for (const row of rows) {
    origins += row.is_origin.filter(Boolean).length;
    if (row.departure_time.length - origins > count) {
      previous = rows[rows.indexOf(row) - 1];

      if (railway === "Yurikamome.Yurikamome") {
        let o = 0;
        for (let i = 0; i < row.departure_time.length; i++) {
          if (row.departure_time[i]! < previous.departure_time[i - o]!) {
            row.is_origin[i] = true;
            o++;
          } else if (
            // This train is marked as "At Ariake connect with train towards Shimbashi", but not marked as originating at Ariake
            direction === "Inbound" &&
            row.station === "Yurikamome.Yurikamome.Ariake" &&
            row.departure_time[i]!.valueOf() ==
              Interval.parse("23:29:00").valueOf()
          ) {
            row.is_origin[i] = true;
            o++;
          }
        }
        origins += o;
        continue;
      }

      const connectingLines = await client.queryArray<
        [string[] | null]
      >`select connecting_railway from odpt.station where id = ${row.station};`;

      const extraConnectingLines = extraConnectingLinesMap[row.station];

      const allConnectingLines: string[] = [
        connectingLines.rows[0]?.[0],
        extraConnectingLines,
      ]
        .flat()
        .filter((a): a is string => typeof a === "string");

      const promises = allConnectingLines.map((c) =>
        findConnectionsFromConnectingLine(
          row.destination_station,
          row.train_type,
          row.calendar,
          c
        )
      );

      if (
        row.station === "Seibu.Shinjuku.KamiShakujii" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.SemiExpress",
            row.calendar,
            "Seibu.Shinjuku.Saginomiya",
            null
          )
        );
      }

      if (
        row.station === "Seibu.Shinjuku.Tanashi" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.Express",
            row.calendar,
            "Seibu.Shinjuku.KamiShakujii",
            null
          )
        );
      }

      if (
        row.station === "Seibu.Shinjuku.ShinTokorozawa" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.RapidExpress",
            row.calendar,
            "Seibu.Shinjuku.Tokorozawa",
            null
          )
        );
      }

      if (
        row.station === "Seibu.Ikebukuro.ShakujiiKoen" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.SemiExpress",
            row.calendar,
            "Seibu.Ikebukuro.Nerima",
            null
          )
        );
      }

      if (
        row.station === "Seibu.Ikebukuro.Hibarigaoka" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.Rapid",
            row.calendar,
            "Seibu.Ikebukuro.ShakujiiKoen",
            null
          )
        );
      }

      if (
        row.station === "Seibu.Ikebukuro.Tokorozawa" &&
        row.train_type === "Seibu.Local"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            row.destination_station,
            "Seibu.Express",
            row.calendar,
            "Seibu.Ikebukuro.Hibarigaoka",
            null
          )
        );
      }

      if (
        row.station === "Keikyu.Main.KanazawaBunko" &&
        row.train_type === "Keikyu.RapidLimitedExpress"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keikyu.Main.KanazawaBunko"],
            "Keikyu.LimitedExpress",
            row.calendar,
            "Keikyu.Main.KanazawaHakkei",
            null
          ).then((connections) =>
            connections.filter(
              (connection) =>
                connection.departure_time < Interval.parse("09:00:00")
            )
          )
        );
      }

      if (
        row.station === "Keio.Keio.Takahatafudo" &&
        row.train_type === "Keio.Local" &&
        row.destination_station[0] === "Keio.Keio.KeioHachioji"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Keio.KeioHachioji"],
            "Keio.SemiLimitedExpress",
            row.calendar,
            "Keio.Keio.SeisekiSakuragaoka",
            "高幡不動から各駅停車"
          )
        )
      }

      if (
        row.station === "Keio.Keio.Takahatafudo" &&
        row.train_type === "Keio.Local" &&
        row.destination_station[0] === "Keio.Takao.Takaosanguchi"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Takao.Takaosanguchi"],
            "Keio.SemiLimitedExpress",
            row.calendar,
            "Keio.Keio.SeisekiSakuragaoka",
            "高幡不動から各駅停車"
          )
        );

        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Takao.Takaosanguchi"],
            "Keio.LimitedExpress",
            row.calendar,
            "Keio.Keio.SeisekiSakuragaoka",
            "高幡不動から各駅停車"
          )
        );
      }

      if (
        row.station === "Keio.Keio.Takahatafudo" &&
        row.train_type === "Keio.LimitedExpress" &&
        row.destination_station[0] === "Keio.Keio.Shinjuku"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Keio.Shinjuku"],
            "Keio.Local",
            row.calendar,
            "Keio.Keio.Minamidaira",
            "高幡不動から特急"
          )
        )
      }

      if (
        row.station === "Keio.Keio.Takahatafudo" &&
        row.train_type === "Keio.SemiLimitedExpress" &&
        row.destination_station[0] === "Keio.Keio.Shinjuku"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Keio.Shinjuku"],
            "Keio.Local",
            row.calendar,
            "Keio.Keio.Minamidaira",
            "高幡不動から準特急"
          )
        )
      }

      if (
        row.station === "Keio.Sagamihara.KeioTamaCenter" &&
        row.train_type === "Keio.Local" &&
        row.destination_station[0] === "Keio.Sagamihara.Hashimoto"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Sagamihara.Hashimoto"],
            "Keio.SemiLimitedExpress",
            row.calendar,
            "Keio.Sagamihara.KeioNagayama",
            "京王多摩センターから各駅停車"
          )
        )

        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Sagamihara.Hashimoto"],
            "Keio.LimitedExpress",
            row.calendar,
            "Keio.Sagamihara.KeioNagayama",
            "京王多摩センターから各駅停車"
          )
        )

        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Sagamihara.Hashimoto"],
            "Keio.Express",
            row.calendar,
            "Keio.Sagamihara.KeioNagayama",
            "京王多摩センターから各駅停車"
          )
        )
      }

      if (
        row.station === "Keio.Sagamihara.KeioTamaCenter" &&
        row.train_type === "Keio.SemiLimitedExpress" &&
        row.destination_station[0] === "Keio.Keio.Shinjuku"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Keio.Keio.Shinjuku"],
            "Keio.Local",
            row.calendar,
            "Keio.Sagamihara.KeioHorinouchi",
            "京王多摩センターから準特急"
          )
        )
      }

      if (
        row.station === "Keio.Sagamihara.KeioTamaCenter" &&
        row.train_type === "Keio.Express" &&
        row.destination_station[0] === "Toei.Shinjuku.Motoyawata"
      ) {
        promises.push(
          findConnectionsFromConnectingLineAtStation(
            ["Toei.Shinjuku.Motoyawata"],
            "Keio.Local",
            row.calendar,
            "Keio.Sagamihara.KeioHorinouchi",
            "京王多摩センターから急行"
          )
        )
      }




      const connections = (await Promise.all(promises)).flat();

      if (row.station === "Keio.Keio.Sasazuka" || row.station === "Keio.Keio.Chofu") {
        for (const connection of connections.filter(c => c.note !== row.note)) {
          connections.splice(connections.findIndex(c => c === connection), 1)
        }
      }

      if (count + connections.length !== row.departure_time.length - origins) {
        console.log(
          `Decreasing from ${previous?.station} to ${row.station}. Going from ${count} and ${connections.length} to ${origins} origins and ${row.departure_time.length} rows`
        );
        return false;
      }

      for (const connection of connections) {
        const minConnectionTime =
          minConnectingTimes[connection.station]?.[row.station];
        if (minConnectionTime == null) {
          console.log(
            "connecting time for " + connection.station + " " + row.station
          );
          return false;
        }
        const i = row.departure_time
          .map((t) =>
            t!
              .subtract(connection.departure_time)
              .subtractSeconds(minConnectionTime)
          )
          .findIndex((t, j) => !row.is_origin[j] && t.valueOf() >= 0);
        // TODO: we should set another marker, this confuses timetable object generation
        row.is_origin[i] = true;
        origins += 1;
        createdConnections.push([connection, row, row.departure_time[i]!]);
      }
    } else if (row.departure_time.length - origins < count) {
      console.error(
        `Timetable has fewer times at ${row.station}. Previous was ${previous?.station}`
      );
      return false;
    }
  }

  return true;
}

export function processDecreasingTimetable(
  railway: string,
  direction: string,
  [first, ...rows]: OdptTimetable[]
): boolean {
  let origins = 0;
  const count = first.departure_time.length;
  let previous: OdptTimetable | undefined;
  for (const row of rows) {
    origins += row.is_origin.filter(Boolean).length;
    if (row.departure_time.length - origins != count) {
      
      console.log(
        `Decreasing from ${previous?.station} to ${row.station}. Going from ${count} to ${origins} origins and ${row.departure_time.length} rows`
      );
      return false;
    }

    previous = row;
  }
  return true;
}
