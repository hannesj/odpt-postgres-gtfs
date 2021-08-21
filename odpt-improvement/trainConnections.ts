import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { Interval } from "./interval.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();


export interface Connection {
  station: string;
  // deno-lint-ignore camelcase
  rail_direction: string;
  // deno-lint-ignore camelcase
  train_type: string;
  // deno-lint-ignore camelcase
  destination_station: string[];
  // deno-lint-ignore camelcase
  departure_time: Interval;
  note: string | null
}


export async function findConnectionsFromConnectingLine(
  destinationStation: string[],
  trainType: string,
  calendar: string,
  previousRailway: string
): Promise<Connection[]> {
  const res = await client.queryObject<Connection & {departure_time: string}>`
select st.station,
  st.rail_direction,
  sto.departure_time,
  sto.destination_station,
  sto.train_type,
  sto.note -> 'ja' as note
from odpt.station_timetable_object sto
  inner join odpt.station_timetable st on st.id = sto.station_timetable
  inner join odpt.railway r on r.id = ${previousRailway}
  inner join odpt.station_order so on so.railway = r.id
  and so.station = st.station
where sto.destination_station = ${destinationStation}
  and sto.train_type = ${trainType}
  and st.calendar = ${calendar}
  and i = (
    select case
        when rail_direction = ascending_rail_direction then max(i)
        else min(i)
      end
    from (
        select so.i,
          st.station,
          st.rail_direction,
          r.ascending_rail_direction
        from odpt.station_timetable_object sto
          inner join odpt.station_timetable st on st.id = sto.station_timetable
          inner join odpt.railway r on r.id = ${previousRailway}
          inner join odpt.station_order so on so.railway = r.id
          and so.station = st.station
        where sto.destination_station = ${destinationStation}
          and sto.train_type = ${trainType}
          and st.calendar = ${calendar}
          and st.railway = ${previousRailway}
      ) as departures
    group by rail_direction,
      ascending_rail_direction
  )  
  `;

  return res.rows.map(r => ({...r, departure_time: Interval.parse(r.departure_time)}));
}


export async function findConnectionsFromConnectingLineAtStation(
  destinationStation: string[],
  trainType: string,
  calendar: string,
  previousStation: string,
  note: string | null
): Promise<Connection[]> {
  const res = await client.queryObject<Connection & {departure_time: string}>`
select st.station,
  st.rail_direction,
  sto.departure_time,
  sto.destination_station,
  sto.train_type,
  sto.note -> 'ja' as note
from odpt.station_timetable_object sto
  inner join odpt.station_timetable st on st.id = sto.station_timetable
where sto.destination_station = ${destinationStation}
  and sto.train_type = ${trainType}
  and st.calendar = ${calendar}  
  and st.station = ${previousStation}
  and (${note === null} or sto.note -> 'ja' = ${note})
  and (${note !== null} or sto.note -> 'ja' is null)
  `;

  return res.rows.map(r => ({...r, departure_time: Interval.parse(r.departure_time)}));
}


export const extraConnectingLinesMap: Record<string, string[]> = {
  "Keikyu.Main.KanazawaBunko": ["Keikyu.Zushi"],
  "Seibu.Ikebukuro.ShakujiiKoen": [
    "TokyoMetro.Yurakucho",
    "TokyoMetro.Fukutoshin"
  ]
};

export const nextStopConnections: Record<string, Record<string, Record<string, string>>> = {
  "Keikyu.Airport.Kojiya": {
    "Keikyu.AirportExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.KanagawaShimmachi": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.KanazawaBunko": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.KeikyuKawasaki": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.Sengakuji": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.Shinagawa": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Airport.KeikyuKamata",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Oshiage.Aoto": "Keikyu.Airport.KeikyuKamata",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Main.KeiseiNarita": "Keikyu.Airport.KeikyuKamata",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Airport.KeikyuKamata",
      "Toei.Asakusa.Oshiage": "Keikyu.Airport.KeikyuKamata",
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Airport.KeikyuKamata",
    },
    "Keikyu.Local": {
      "Keikyu.Main.Shinagawa": "Keikyu.Airport.KeikyuKamata",
    }
  },
  "Keikyu.Airport.HanedaAirportTerminal3": {
    "Keikyu.AirportRapidLimitedExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Shinagawa",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Shinagawa",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Main.Shinagawa",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Main.Shinagawa"
    },
    "Keikyu.RapidLimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Airport.KeikyuKamata",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Airport.KeikyuKamata",
      "Keikyu.Main.Shinagawa": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Airport.KeikyuKamata",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Airport.KeikyuKamata",
      "Keisei.Oshiage.Aoto": "Keikyu.Airport.KeikyuKamata",
    }
  },
  "Keikyu.Kurihama.Shinotsu": {
    "Keikyu.LimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.KanagawaShimmachi": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.Sengakuji": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.Shinagawa": "Keikyu.Kurihama.Horinouchi",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Kurihama.Horinouchi",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Kurihama.Horinouchi",
      "Keisei.Oshiage.Aoto": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.KanazawaBunko": "Keikyu.Kurihama.Horinouchi",
      "Toei.Asakusa.Oshiage": "Keikyu.Kurihama.Horinouchi"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.Sengakuji": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.Shinagawa": "Keikyu.Kurihama.Horinouchi",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Kurihama.Horinouchi",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Kurihama.Horinouchi",
      "Keisei.Oshiage.Aoto": "Keikyu.Kurihama.Horinouchi",
      "Toei.Asakusa.Oshiage": "Keikyu.Kurihama.Horinouchi",
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Kurihama.Horinouchi",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Kurihama.Horinouchi"
    },
    "Keikyu.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.KanazawaBunko": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.KeikyuKawasaki": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Main.Shinagawa": "Keikyu.Kurihama.Horinouchi"
    }
  },
  "Keikyu.Kurihama.Miurakaigan": {
    "Keikyu.MorningWing": {
      "Keikyu.Main.Sengakuji": "Keikyu.Main.YokosukaChuo",
      "Keikyu.Main.Shinagawa": "Keikyu.Main.YokosukaChuo"
    }
  },
  "Keikyu.Main.Kenritsudaigaku": {
    "Keikyu.Local": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Main.Horinouchi"
    }
  },
  "Keikyu.Main.Heiwajima": {
    "Keikyu.AirportExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata"
    }
  },
  "Keikyu.Main.YokosukaChuo": {
    "Keikyu.LimitedExpress": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Main.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Main.Horinouchi",
      "Keikyu.Kurihama.Miurakaigan": "Keikyu.Main.Horinouchi"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Main.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Main.Horinouchi"
    },
    "Keikyu.EveningWing": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Main.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Main.Horinouchi"
    }
  },
  "Keikyu.Main.KanazawaBunko": {
    "Keikyu.Local": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Main.KanazawaHakkei"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Main.KanazawaHakkei"
    },
    "Keikyu.AirportExpress": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Main.KanazawaHakkei"
    }
  },
  "Keikyu.Main.KanazawaHakkei": {
    "Keikyu.Local": {
      "Keikyu.Main.KanazawaBunko": "Keikyu.Main.KanazawaBunko"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Main.KanazawaBunko": "Keikyu.Main.KanazawaBunko"
    }
  },
  "Keikyu.Main.Shinagawa": {
    "Keikyu.AirportRapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.HanedaAirportTerminal3",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Sengakuji",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Main.Sengakuji"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Sengakuji",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.Sengakuji",
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.Sengakuji",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Main.Sengakuji"
    },
    "Keikyu.AirportExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Sengakuji",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Sengakuji",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Main.Sengakuji",
      "Keisei.Main.KeiseiNarita": "Keikyu.Main.Sengakuji",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Main.Sengakuji",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.Sengakuji"
    },
    "Keikyu.LimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.Sengakuji",
      "Keisei.Main.KeiseiSakura": "Keikyu.Main.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Sengakuji",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Sengakuji",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.Sengakuji"
    },
    "Keikyu.Local": {
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Sengakuji"
    }
  },
  "Keikyu.Main.Zoshiki": {
    "Keikyu.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata"
    }
  },
  "Keikyu.Main.KeikyuKawasaki": {
    "Keikyu.AirportExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KeikyuKamata"
    }
  },
  "Keikyu.Zushi.Mutsuura": {
    "Keikyu.AirportExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Zushi.KanazawaHakkei"
    },
    "Keikyu.Local": {
      "Keikyu.Main.KanazawaBunko": "Keikyu.Zushi.KanazawaHakkei",
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Zushi.KanazawaHakkei",
      "Keikyu.Main.KanagawaShimmachi": "Keikyu.Zushi.KanazawaHakkei",
      "Keikyu.Main.KeikyuKawasaki": "Keikyu.Zushi.KanazawaHakkei",
      "Keikyu.Main.Shinagawa": "Keikyu.Zushi.KanazawaHakkei"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Zushi.KanazawaHakkei",
      "Keisei.Oshiage.Aoto": "Keikyu.Zushi.KanazawaHakkei",
      "Toei.Asakusa.Oshiage": "Keikyu.Zushi.KanazawaHakkei"
    }
  },
  "Keio.Keio.SeisekiSakuragaoka": {
    "Keio.LimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Takahatafudo",
      "Keio.Keio.Takahatafudo": "Keio.Keio.Takahatafudo"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Takahatafudo",
      "Keio.Keio.KeioHachioji": "Keio.Keio.Takahatafudo"
    },
    "Keio.Express": {
      "Keio.Keio.Takahatafudo": "Keio.Keio.Takahatafudo"
    },
  },
  "Keio.Keio.Takahatafudo": {
    "Keio.Express": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Kitano"
    },
    "Keio.LimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Kitano"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Kitano"
    }
  },
  "Keio.Keio.Minamidaira": {
    "Keio.Local": {
      "Keio.Keio.Shinjuku": "Keio.Keio.Takahatafudo",
      "Keio.Keio.Takahatafudo": "Keio.Keio.Takahatafudo"
    }
  },
  "Keio.Keio.Naganuma": {
    "Keio.Local": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Kitano",
      "Keio.Takao.Takao": "Keio.Keio.Kitano"
    },
    "Keio.Rapid": {
      "Keio.Takao.Takaosanguchi": "Keio.Keio.Kitano"
    }
  },
  "Keio.Keio.Fuda": {
    "Keio.Local": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu"
    }
  },
  "Keio.Keio.Tsutsujigaoka": {
    "Keio.Rapid": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Keio.Chofu"
    },
    "Keio.SemiExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Keio.Chofu"
    },
    "Keio.Express": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu"
    }
  },
  "Keio.Keio.ChitoseKarasuyama": {
    "Keio.SemiLimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu"
    }
  },
  "Keio.Keio.Meidaimae": {
    "Keio.LimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Keio.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Chofu"
    },
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Sasazuka"
    },
    "Keio.Rapid": {
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Sasazuka"
    },
    "Keio.SemiExpress": {
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Sasazuka",
      "Toei.Shinjuku.Ojima": "Keio.Keio.Sasazuka"
    }
  },
  "Keio.Keio.Shinjuku": {
    "Keio.KeioLiner": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.KeioNagayama",
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Takaosanguchi"
    }
  },
  "Keio.Keio.Daitabashi": {
    "Keio.Local": {
      "Keio.KeioNew.Shinjuku": "Keio.Keio.Sasazuka",
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Sasazuka",
      "Toei.Shinjuku.Ojima": "Keio.Keio.Sasazuka"
    }
  },
  "Keio.KeioNew.Hatagaya": {
    "Keio.Express": {
      "Keio.Takao.Takaosanguchi": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Hashimoto": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.KeioNew.Sasazuka"
    },
    "Keio.Local": {
      "Keio.Keio.Sakurajosui": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Wakabadai": "Keio.KeioNew.Sasazuka",
      "Keio.Takao.Takaosanguchi": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Hashimoto": "Keio.KeioNew.Sasazuka"
    },
    "Keio.Rapid": {
      "Keio.Keio.Chofu": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Hashimoto": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Wakabadai": "Keio.KeioNew.Sasazuka"
    },
    "Keio.SemiExpress": {
      "Keio.Keio.Sakurajosui": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.Hashimoto": "Keio.KeioNew.Sasazuka",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.KeioNew.Sasazuka"
    }
  },
  "Keio.KeioNew.Hatsudai": {
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Shinjuku",
      "Toei.Shinjuku.Ojima": "Keio.KeioNew.Shinjuku"
    },
    "Keio.Local": {
      "Toei.Shinjuku.Iwamotocho": "Keio.KeioNew.Shinjuku",
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Shinjuku",
      "Toei.Shinjuku.Ojima": "Keio.KeioNew.Shinjuku"
    },
    "Keio.Rapid": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Shinjuku"
    },
    "Keio.SemiExpress": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Shinjuku",
      "Toei.Shinjuku.Ojima": "Keio.KeioNew.Shinjuku"
    }
  },
  "Keio.Sagamihara.KeioInadazutsumi": {
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Keio.Sagamihara.Chofu",
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu"
    },
    "Keio.LimitedExpress": {
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu"
    }
  },
  "Keio.Sagamihara.KeioNagayama": {
    "Keio.KeioLiner": {
      "Keio.Keio.Shinjuku": "Keio.Keio.Shinjuku"
    },
    "Keio.LimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.KeioTamaCenter",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter"
    },
    "Keio.Rapid": {
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter"
    },
    "Keio.SemiExpress": {
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.KeioTamaCenter",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter"
    },
    "Keio.Express": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.KeioTamaCenter",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter"
    },
    "Keio.Local": {
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.KeioTamaCenter",
      "Keio.Sagamihara.Wakabadai": "Keio.Sagamihara.Wakabadai"
    }
  },
  "Keio.Sagamihara.KeioTamagawa": {
    "Keio.Rapid": {
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu",
      "Keio.Keio.Tsutsujigaoka": "Keio.Sagamihara.Chofu",
      "Toei.Shinjuku.Motoyawata": "Keio.Sagamihara.Chofu"
    },
    "Keio.SemiExpress": {
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu",
      "Toei.Shinjuku.Motoyawata": "Keio.Sagamihara.Chofu",
      "Toei.Shinjuku.Ojima": "Keio.Sagamihara.Chofu"
    },
    "Keio.Local": {
      "Keio.KeioNew.Shinjuku": "Keio.Sagamihara.Chofu",
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.Chofu",
      "Toei.Shinjuku.Ojima": "Keio.Sagamihara.Chofu",
      "Toei.Shinjuku.Motoyawata": "Keio.Sagamihara.Chofu"
    }
  },
  "Keio.Sagamihara.KeioHorinouchi": {
    "Keio.Local": {
      "Keio.Keio.Shinjuku": "Keio.Sagamihara.KeioTamaCenter",
      "Toei.Shinjuku.Motoyawata": "Keio.Sagamihara.KeioTamaCenter",
    }
  },
  "Keio.Takao.KeioKatakura": {
    "Keio.Local": {
      "Keio.Keio.Sakurajosui": "Keio.Takao.Kitano",
      "Keio.Keio.Shinjuku": "Keio.Takao.Kitano",
      "Keio.Keio.Takahatafudo": "Keio.Takao.Kitano",
      "Keio.KeioNew.Shinjuku": "Keio.Takao.Kitano",
      "Keio.Keio.Chofu": "Keio.Takao.Kitano",
      "Keio.Keio.Fuchu": "Keio.Takao.Kitano",
      "Toei.Shinjuku.Motoyawata": "Keio.Takao.Kitano"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Keio.Shinjuku": "Keio.Takao.Kitano"
    }
  },
  "Keio.Takao.Mejirodai": {
    "Keio.KeioLiner": {
      "Keio.Keio.Shinjuku": "Keio.Takao.Kitano"
    },
    "Keio.LimitedExpress": {
      "Keio.Keio.Shinjuku": "Keio.Takao.Kitano"
    },
    "Keio.Express": {
      "Keio.Keio.Shinjuku": "Keio.Takao.Kitano"
    }
  },
  "Keisei.Chiba.KeiseiChiba": {
    "Keisei.Local": {
      "Keisei.Chihara.Chiharadai": "Keisei.Chiba.ChibaChuo"
    }
  },
  "Keisei.Chiba.KeiseiMakuharihongo": {
    "Keisei.Local": {
      "Keisei.Main.KeiseiUeno": "Keisei.Chiba.KeiseiTsudanuma",
      "ShinKeisei.ShinKeisei.Matsudo": "Keisei.Chiba.KeiseiTsudanuma"
    }
  },
  "Keisei.Chihara.Chibadera": {
    "Keisei.Local": {
      "Keisei.Chiba.KeiseiTsudanuma": "Keisei.Chihara.ChibaChuo",
      "Keisei.Main.KeiseiUeno": "Keisei.Chihara.ChibaChuo"
    }
  },
  "Keisei.HigashiNarita.KeiseiNarita": {
    "Keisei.LimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.HigashiNarita"
    },
    "Keisei.Local": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.HigashiNarita"
    },
    "Keisei.Rapid": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.HigashiNarita"
    },
    "Keisei.RapidLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.HigashiNarita"
    },
    "Keisei.CommuterLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.HigashiNarita"
    }
  },
  "Keisei.HigashiNarita.HigashiNarita": {
    "Keisei.LimitedExpress": {
      "Keisei.Main.KeiseiUeno": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.Local": {
      "Keisei.Main.KeiseiUeno": "Keisei.HigashiNarita.KeiseiNarita",
      "Keisei.Main.Sogosando": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.Rapid": {
      "Keisei.Main.KeiseiUeno": "Keisei.HigashiNarita.KeiseiNarita",
      "Keisei.Main.KeiseiTakasago": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.RapidLimitedExpress": {
      "Keisei.Main.KeiseiUeno": "Keisei.HigashiNarita.KeiseiNarita",
      "Toei.Asakusa.NishiMagome": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.CommuterLimitedExpress": {
      "Keisei.Main.KeiseiUeno": "Keisei.HigashiNarita.KeiseiNarita"
    }
  },
  "Keisei.Main.Aoto": {
    "Keisei.AccessExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.Main.KeiseiTakasago"
    },
    "Keisei.Local": {
      "Hokuso.Hokuso.InzaiMakinohara": "Keisei.Main.KeiseiTakasago",
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Main.KeiseiTakasago"
    },
    "Keisei.LimitedExpress": {
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Main.KeiseiTakasago"
    },
    "Keisei.Skyliner": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3"
    }
  },
  "Keisei.Main.Kozunomori": {
    "Keisei.LimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.KeiseiNarita"
    },
    "Keisei.Local": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.KeiseiNarita"
    },
    "Keisei.Rapid": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.KeiseiNarita"
    },
    "Keisei.CommuterLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.KeiseiNarita"
    }
  },
  "Keisei.Main.Yatsu": {
    "Keisei.Local": {
      "Keisei.Chiba.ChibaChuo": "Keisei.Main.KeiseiTsudanuma",
      "Keisei.Chihara.Chiharadai": "Keisei.Main.KeiseiTsudanuma"
    }
  },
  "Keisei.Main.KeiseiSakura": {
    "Keisei.RapidLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.KeiseiNarita"
    }
  },
  "Keisei.Main.Nippori": {
    "Keisei.Skyliner": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3"
    }
  },
  "Keisei.Main.KeiseiTakasago": {
    "Keisei.Rapid": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Main.Aoto"
    },
    "Keisei.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto"
    },
    "Keisei.CommuterLimitedExpress": {
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto"
    },
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Main.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto"
    },
    "Keisei.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto"
    },
    "Keisei.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Main.Aoto",
      "Keikyu.Main.KanazawaBunko": "Keisei.Main.Aoto",
      "Keikyu.Main.Shinagawa": "Keisei.Main.Aoto",
      "Keisei.Oshiage.Oshiage": "Keisei.Main.Aoto",
      "Toei.Asakusa.Asakusabashi": "Keisei.Main.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.Aoto",
      "Toei.Asakusa.Sengakuji": "Keisei.Main.Aoto",
      "Keikyu.Kurihama.Miurakaigan": "Keisei.Main.Aoto",
    }
  },
  "Keisei.NaritaSkyAccess.HigashiMatsudo": {
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.NaritaSkyAccess.KeiseiTakasago",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.NaritaSkyAccess.KeiseiTakasago",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.NaritaSkyAccess.KeiseiTakasago",
      "Keisei.Main.KeiseiUeno": "Keisei.NaritaSkyAccess.KeiseiTakasago",
      "Toei.Asakusa.NishiMagome": "Keisei.NaritaSkyAccess.KeiseiTakasago"
    }
  },
  "Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3": {
    "Keisei.Skyliner": {
      "Keisei.Main.KeiseiUeno": "Keisei.Main.Nippori",
    }
  },
  "Keisei.Oshiage.KeiseiTateishi": {
    "Keisei.Local": {
      "Hokuso.Hokuso.InzaiMakinohara": "Keisei.Oshiage.Aoto",
      "Keisei.Main.KeiseiTakasago": "Keisei.Oshiage.Aoto",
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Oshiage.Aoto"
    }
  },
  "Keisei.Oshiage.Oshiage": {
    "Keisei.AccessExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.Oshiage.Aoto"
    },
    "Keisei.Rapid": {
      "Keisei.Main.KeiseiNarita": "Keisei.Oshiage.Aoto",
      "Keisei.Main.KeiseiSakura": "Keisei.Oshiage.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Oshiage.Aoto"
    },
    "Keisei.RapidLimitedExpress": {
      "Keisei.Main.KeiseiTakasago": "Keisei.Oshiage.Aoto",
      "Keisei.Main.KeiseiNarita": "Keisei.Oshiage.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Oshiage.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Oshiage.Aoto"
    },
    "Keisei.CommuterLimitedExpress": {
      "Keisei.Main.KeiseiNarita": "Keisei.Oshiage.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Oshiage.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Oshiage.Aoto"
    },
    "Keisei.LimitedExpress": {
      "Keisei.Main.KeiseiNarita": "Keisei.Oshiage.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Oshiage.Aoto",
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Oshiage.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Oshiage.Aoto"
    }
  },
  "Keisei.Oshiage.Aoto": {
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage"
    },
    "Keisei.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage"
    },
    "Keisei.Rapid": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Oshiage",
      "Keikyu.Main.KanagawaShimmachi": "Keisei.Oshiage.Oshiage"
    },
    "Keisei.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage"
    },
    "Keisei.CommuterLimitedExpress": {
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage"
    }
  },
  "Keisei.Oshiage.KeiseiHikifune": {
    "Keisei.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Oshiage",
      "Keikyu.Kurihama.Miurakaigan": "Keisei.Oshiage.Oshiage",
      "Keikyu.Main.KanazawaBunko": "Keisei.Oshiage.Oshiage",
      "Keikyu.Main.Shinagawa": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.Asakusabashi": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Oshiage",
      "Toei.Asakusa.Sengakuji": "Keisei.Oshiage.Oshiage"
    }
  },
  "Seibu.Haijima.Kodaira": {
    "Seibu.Local": {
      "Seibu.Tamako.Tamako": "Seibu.Haijima.Hagiyama"
    }
  },
  "Seibu.Haijima.Hagiyama": {
    "Seibu.Express": {
      "Seibu.Shinjuku.SeibuShinjuku": "Seibu.Haijima.Kodaira"
    },
    "Seibu.Local": {
      "Seibu.Shinjuku.SeibuShinjuku": "Seibu.Haijima.Kodaira"
    },
    "Seibu.SemiExpress": {
      "Seibu.Shinjuku.SeibuShinjuku": "Seibu.Haijima.Kodaira"
    }
  },
  "Seibu.Ikebukuro.Sakuradai": {
    "Seibu.Local": {
      "Seibu.Toshima.Toshimaen": "Seibu.Ikebukuro.Nerima"
    }
  },
  "Seibu.Ikebukuro.Hanno": {
    "Seibu.LimitedExpress": {
      "Seibu.SeibuChichibu.SeibuChichibu": "Seibu.SeibuChichibu.Yokoze"
    },
    "Seibu.S-TRAIN": {
      "Seibu.SeibuChichibu.SeibuChichibu": "Seibu.SeibuChichibu.SeibuChichibu"
    }
  },
  "Seibu.Ikebukuro.HigashiAgano": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi/Chichibu.Chichibu.Nagatoro": "Seibu.Ikebukuro.Agano",
      "Seibu.SeibuChichibu.SeibuChichibu": "Seibu.Ikebukuro.Agano"
    }
  },
  "Seibu.Ikebukuro.ShakujiiKoen": {
    "Seibu.Rapid": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba":"Seibu.Ikebukuro.Nerima",
      "Seibu.Sayama.SeibukyujoMae": "Seibu.Ikebukuro.Hibarigaoka",
      "Seibu.Ikebukuro.Hanno": "Seibu.Ikebukuro.Hibarigaoka",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.Ikebukuro.Hibarigaoka",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.Ikebukuro.Hibarigaoka"
    },
    "Seibu.SemiExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.Ikebukuro.Nerima"
    },
    "Seibu.RapidExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Nerima",
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    },
    "Seibu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.Ikebukuro",
      "TokyoMetro.Yurakucho.Toyosu": "TokyoMetro.Yurakucho.Iidabashi",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.Ikebukuro.Tokorozawa"
    },
    "Seibu.Express": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    },
    "Seibu.CommuterExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    }
  },
  "Seibu.Ikebukuro.Nakamurabashi": {
    "Seibu.Local": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Nerima",
      "Seibu.SeibuYurakucho.KotakeMukaihara": "Seibu.Ikebukuro.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.Ikebukuro.Nerima",
      "Tokyu.Toyoko.Motosumiyoshi": "Seibu.Ikebukuro.Nerima",
      "Tokyu.Toyoko.Yokohama": "Seibu.Ikebukuro.Nerima",
      "Tokyu.Toyoko.MusashiKosugi": "Seibu.Ikebukuro.Nerima",
      "Tokyu.Toyoko.Kikuna": "Seibu.Ikebukuro.Nerima"
    }
  },
  "Seibu.Ikebukuro.Tokorozawa": {
    "Seibu.Local": {
      "Seibu.Sayama.SeibukyujoMae": "Seibu.Ikebukuro.NishiTokorozawa"
    }
  },
  "Seibu.Ikebukuro.Nerima": {
    "Seibu.SemiExpress": {
      "Seibu.Sayama.SeibukyujoMae": "Seibu.Ikebukuro.ShakujiiKoen",
      "Seibu.Ikebukuro.Hanno": "Seibu.Ikebukuro.ShakujiiKoen",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.Ikebukuro.ShakujiiKoen",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.Ikebukuro.ShakujiiKoen",
      "Seibu.Ikebukuro.Hoya": "Seibu.Ikebukuro.ShakujiiKoen",
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    },
    "Seibu.Rapid": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    },
    "Seibu.CommuterSemiExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Ikebukuro"
    }
  },
  "Seibu.Ikebukuro.Hibarigaoka": {
    "Seibu.Express": {
      "Seibu.Ikebukuro.Hanno": "Seibu.Ikebukuro.Tokorozawa"
    },
    "Seibu.RapidExpress": {
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.Ikebukuro.Tokorozawa"
    },
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hoya": "Seibu.Ikebukuro.Hoya"
    }
  },
  "Seibu.Kokubunji.Ogawa": {
    "Seibu.Local": {
      "Seibu.Seibuen.Seibuen": "Seibu.Kokubunji.HigashiMurayama"
    }
  },
  "Seibu.Sayama.ShimoYamaguchi": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hoya": "Seibu.Sayama.NishiTokorozawa",
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Sayama.NishiTokorozawa"
    },
    "Seibu.SemiExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Sayama.NishiTokorozawa"
    }
  },
  "Seibu.SeibuChichibu.Ashigakubo": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi/Chichibu.Chichibu.Nagatoro": "Seibu.SeibuChichibu.Yokoze"
    }
  },
  "Seibu.SeibuChichibu.Yokoze": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi": "Seibu.SeibuChichibu.SeibuChichibu",
      "Chichibu.Chichibu.Nagatoro": "Chichibu.Chichibu.Ohanabatake"
    },
    "Seibu.LimitedExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Hanno"
    }
  },
  "Seibu.SeibuChichibu.NishiAgano": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hanno": "Seibu.SeibuChichibu.Agano"
    },
    "Seibu.RapidExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.SeibuChichibu.Agano"
    }
  },
  "Seibu.SeibuChichibu.SeibuChichibu": {
    "Seibu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Hanno"
    }
  },
  "Seibu.SeibuYurakucho.ShinSakuradai": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hanno": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Hoya": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Kiyose": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.ShakujiiKoen": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.SeibuYurakucho.Nerima",
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "Tokyu.Toyoko.Motosumiyoshi": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "Tokyu.Toyoko.MusashiKosugi": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "Tokyu.Toyoko.Yokohama": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "Tokyu.Toyoko.Kikuna": "Seibu.SeibuYurakucho.KotakeMukaihara"
    },
    "Seibu.Rapid": {
      "Seibu.Ikebukuro.Hanno": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.SeibuYurakucho.Nerima",
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.KotakeMukaihara"
    },
    "Seibu.SemiExpress": {
      "Seibu.Ikebukuro.Hanno": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Hoya": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.SeibuYurakucho.Nerima",
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.KotakeMukaihara"
    }
  },
  "Seibu.SeibuYurakucho.KotakeMukaihara": {
    "Seibu.RapidExpress": {
      "Seibu.Ikebukuro.Hanno": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.SeibuYurakucho.Nerima"
    }
  },
  "Seibu.SeibuYurakucho.Nerima": {
    "Seibu.RapidExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.KotakeMukaihara"
    }
  },
  "Seibu.Seibuen.Seibuen": {
    "Seibu.Local": {
      "Seibu.Kokubunji.Kokubunji":  "Seibu.Seibuen.HigashiMurayama"
    }
  },
  "Seibu.Shinjuku.HanaKoganei": {
    "Seibu.Local": {
      "Seibu.Haijima.TamagawaJosui": "Seibu.Shinjuku.Kodaira",
      "Seibu.Tamako.Tamako": "Seibu.Shinjuku.Kodaira",
      "Seibu.Haijima.Haijima": "Seibu.Shinjuku.Kodaira",
    }
  },
  "Seibu.Shinjuku.Takadanobaba": {
    "Seibu.HaijimaLiner": {
      "Seibu.Haijima.Haijima": "Seibu.Shinjuku.Kodaira"
    }
  },
  "Seibu.Shinjuku.KamiShakujii": {
    "Seibu.Express": {
      "Seibu.Haijima.Haijima": "Seibu.Shinjuku.Tanashi",
      "Seibu.Haijima.TamagawaJosui": "Seibu.Shinjuku.Tanashi",
      "Seibu.Shinjuku.HonKawagoe": "Seibu.Shinjuku.Tanashi",
      "Seibu.Shinjuku.ShinTokorozawa": "Seibu.Shinjuku.Tanashi",
      "Seibu.Shinjuku.Tanashi": "Seibu.Shinjuku.Tanashi"
    }
  },
  "Seibu.Shinjuku.Saginomiya": {
    "Seibu.SemiExpress": {
      "Seibu.Haijima.Haijima": "Seibu.Shinjuku.KamiShakujii",
      "Seibu.Haijima.TamagawaJosui": "Seibu.Shinjuku.KamiShakujii",
      "Seibu.Shinjuku.HonKawagoe": "Seibu.Shinjuku.KamiShakujii",
      "Seibu.Shinjuku.ShinTokorozawa": "Seibu.Shinjuku.KamiShakujii",
      "Seibu.Shinjuku.Tanashi": "Seibu.Shinjuku.KamiShakujii"
    }
  },
  "Seibu.Shinjuku.Tokorozawa": {
    "Seibu.RapidExpress": {
      "Seibu.Shinjuku.HonKawagoe": "Seibu.Shinjuku.ShinTokorozawa"
    }
  },
  "Seibu.Tamako.Yasaka": {
    "Seibu.Local": {
      "Seibu.Shinjuku.SeibuShinjuku": "Seibu.Tamako.Hagiyama"
    }
  },
  "Seibu.Toshima.Toshimaen": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Toshima.Nerima"
    }
  },
  "Tokyu.DenEnToshi.SangenJaya": {
    "Tokyu.Express": {
      "Tobu.Isesaki.Kuki": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.TobuSkytree.KitaKoshigaya": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.TobuSkytree.TobuDobutsuKoen": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "Tokyu.DenEnToshi.Shibuya"
    }
  },
  "Tokyu.DenEnToshi.Saginuma": {
    "Tokyu.Express": {
      "Tokyu.Oimachi.Oimachi": "Tokyu.DenEnToshi.Mizonokuchi"
    }
  },
  "Tokyu.DenEnToshi.Ikejiriohashi": {
    "Tokyu.Local": {
      "Tobu.Isesaki.Kuki": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.TobuSkytree.KitaKoshigaya": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.TobuSkytree.TobuDobutsuKoen": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.AoyamaItchome": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.Nagatacho": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.Hanzomon": "Tokyu.DenEnToshi.Shibuya"
    },
    "Tokyu.SemiExpress": {
      "Tobu.TobuSkytree.TobuDobutsuKoen": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.Isesaki.Kuki": "Tokyu.DenEnToshi.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "Tokyu.DenEnToshi.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "Tokyu.DenEnToshi.Shibuya"
    }
  },
  "Tokyu.DenEnToshi.Kajigaya": {
    "Tokyu.Local": {
      "Tokyu.Oimachi.Oimachi": "Tokyu.DenEnToshi.Mizonokuchi"
    }
  },
  "Tokyu.Meguro.MusashiKoyama": {
    "Tokyu.Express": {
      "SaitamaRailway.SaitamaRailway.UrawaMisono": "Tokyu.Meguro.Meguro",
      "Toei.Mita.NishiTakashimadaira": "Tokyu.Meguro.Meguro",
      "TokyoMetro.Namboku.AkabaneIwabuchi": "Tokyu.Meguro.Meguro",
      "SaitamaRailway.SaitamaRailway.Hatogaya": "Tokyu.Meguro.Meguro",
      "Toei.Mita.Takashimadaira": "Tokyu.Meguro.Meguro",
      "TokyoMetro.Namboku.OjiKamiya": "Tokyu.Meguro.Meguro"
    }
  },
  "Tokyu.Meguro.FudoMae": {
    "Tokyu.Local": {
      "SaitamaRailway.SaitamaRailway.Hatogaya": "Tokyu.Meguro.Meguro",
      "SaitamaRailway.SaitamaRailway.UrawaMisono": "Tokyu.Meguro.Meguro",
      "Toei.Mita.NishiTakashimadaira": "Tokyu.Meguro.Meguro",
      "Toei.Mita.Takashimadaira": "Tokyu.Meguro.Meguro",
      "TokyoMetro.Namboku.AkabaneIwabuchi": "Tokyu.Meguro.Meguro",
      "TokyoMetro.Namboku.Komagome": "Tokyu.Meguro.Meguro",
      "TokyoMetro.Namboku.OjiKamiya": "Tokyu.Meguro.Meguro"
    }
  },
  "Tokyu.DenEnToshi.Takatsu": {
    "Tokyu.Local": {
      "Tokyu.DenEnToshi.Saginuma": "Tokyu.Oimachi.Mizonokuchi"
    }
  },
  "Tokyu.Oimachi.FutakoTamagawa": {
    "Tokyu.Express": {
      "Tokyu.DenEnToshi.ChuoRinkan": "Tokyu.Oimachi.Mizonokuchi",
      "Tokyu.DenEnToshi.Nagatsuta": "Tokyu.Oimachi.Mizonokuchi"
    }
  },
  "Tokyu.Toyoko.Tammachi": {
    "Tokyu.Local": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama"
    }
  },
  "Tokyu.Toyoko.Kikuna": {
    "Tokyu.Express": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama"
    },
    "Tokyu.CommuterLimitedExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama"
    },
    "Tokyu.F-Liner": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama"
    },
    "Tokyu.LimitedExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama"
    }
  },
  "Tokyu.Toyoko.Jiyugaoka": {
    "Tokyu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Tokyu.Toyoko.Yokohama",
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "Tokyu.Toyoko.Shibuya",
      "Seibu.SeibuChichibu.SeibuChichibu": "Tokyu.Toyoko.Shibuya"
    }
  },
  "Tokyu.Toyoko.DaikanYama": {
    "Tokyu.Local": {
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Hoya": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.ShakujiiKoen": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.ShinjukuSanchome": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Shiki": "Tokyu.Toyoko.Shibuya"
    }
  },
  "Tokyu.Toyoko.NakaMeguro": {
    "Tokyu.Express": {
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Hoya": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.ShakujiiKoen": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Ogawamachi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Shiki": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "Tokyu.Toyoko.Shibuya"
    },
    "Tokyu.CommuterLimitedExpress": {
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.ShinjukuSanchome": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "Tokyu.Toyoko.Shibuya"
    },
    "Tokyu.F-Liner": {
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "Tokyu.Toyoko.Shibuya"
    },
    "Tokyu.LimitedExpress": {
      "Seibu.Ikebukuro.Hanno": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Hoya": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.Ogawamachi": "Tokyu.Toyoko.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "Tokyu.Toyoko.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "Tokyu.Toyoko.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "Tokyu.Toyoko.Shibuya"
    }
  }
}