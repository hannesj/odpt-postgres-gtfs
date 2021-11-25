import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

export async function getDurationBetweenStops(
  from: string,
  to: string,
  trainType: string
): Promise<number> {
  const resWithTrainType = await client.queryArray<[number, string]>`
select count(time), extract (
epoch
from percentile_disc(0.75) within group (
  order by case
      when time < '0'::interval then time + '24h'::interval
      else time
    end
)
)
from (
select coalesce(tt1.arrival_time, tt1.departure_time) - coalesce(tt0.departure_time, tt0.arrival_time) as time
  from odpt.train_timetable_object tt0
  inner join odpt.train_timetable tt on tt0.train_timetable = tt.id
  inner join odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
    and (tt1.departure_station = ${to} or tt1.arrival_station = ${to})
  where (tt0.departure_station = ${from} or tt0.arrival_station = ${from})
    and tt1.i = tt0.i + 1
    and tt.train_type = ${trainType}
) as times`;
  if (resWithTrainType.rows[0][0] > 0 && resWithTrainType.rows[0][1] != null) {
    return Number(resWithTrainType.rows[0][1]);
  }
  const resWithoutTrainType = await client.queryArray<[number, string]>`
  select count(time), extract (
  epoch
  from percentile_disc(0.75) within group (
    order by case
        when time < '0'::interval then time + '24h'::interval
        else time
      end
  )
  )
  from (
    select coalesce(tt1.arrival_time, tt1.departure_time) - coalesce(tt0.departure_time, tt0.arrival_time) as time
    from odpt.train_timetable_object tt0
    inner join odpt.train_timetable tt on tt0.train_timetable = tt.id
    inner join odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
    and (tt1.departure_station = ${to} or tt1.arrival_station = ${to})
  where (tt0.departure_station = ${from} or tt0.arrival_station = ${from})
      and tt1.i = tt0.i + 1
  ) as times`;
  if (
    resWithoutTrainType.rows[0][0] > 0 &&
    resWithoutTrainType.rows[0][1] != null
  ) {
    return Number(resWithoutTrainType.rows[0][1]);
  }
  const resOppositeWithTrainType = await client.queryArray<[number, string]>`
  select count(time), extract (
  epoch
  from percentile_disc(0.75) within group (
    order by case
        when time < '0'::interval then time + '24h'::interval
        else time
      end
  )
  )
  from (
  select coalesce(tt1.departure_time, tt1.arrival_time) - coalesce(tt0.arrival_time, tt0.departure_time) as time
    from odpt.train_timetable_object tt0
    inner join odpt.train_timetable tt on tt0.train_timetable = tt.id
    inner join odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
    and (tt1.departure_station = ${from} or tt1.arrival_station = ${from})
  where (tt0.departure_station = ${to} or tt0.arrival_station = ${to})
      and tt1.i = tt0.i + 1
      and tt.train_type = ${trainType}
  ) as times`;
    if (resOppositeWithTrainType.rows[0][0] > 0 && resOppositeWithTrainType.rows[0][1] != null) {
      return Number(resOppositeWithTrainType.rows[0][1]);
    }
    const resOppositeWithoutTrainType = await client.queryArray<[number, string]>`
    select count(time), extract (
    epoch
    from percentile_disc(0.75) within group (
      order by case
          when time < '0'::interval then time + '24h'::interval
          else time
        end
    )
    )
    from (
    select coalesce(tt1.departure_time, tt1.arrival_time) - coalesce(tt0.arrival_time, tt0.departure_time) as time
      from odpt.train_timetable_object tt0
      inner join odpt.train_timetable tt on tt0.train_timetable = tt.id
      inner join odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
      and (tt1.departure_station = ${from} or tt1.arrival_station = ${from})
    where (tt0.departure_station = ${to} or tt0.arrival_station = ${to})
        and tt1.i = tt0.i + 1
    ) as times`;
    if (
      resOppositeWithoutTrainType.rows[0][0] > 0 &&
      resOppositeWithoutTrainType.rows[0][1] != null
    ) {
      return Number(resOppositeWithoutTrainType.rows[0][1]);
    }
    
  if(staticTravelTimes[from]?.[to]?.[trainType] != null) {
    return staticTravelTimes[from]?.[to]?.[trainType]
  }
  throw new Error(`Unable to find time from ${from} to ${to} with ${trainType}`);
}

export const minConnectingTimes: Record<string, Record<string, number>> = {
  "Keikyu.Airport.Kojiya": {
    "Keikyu.Main.KeikyuKamata": 1 * 60
  },
  "Keikyu.Airport.HanedaAirportTerminal3": {
    "Keikyu.Main.KeikyuKamata": 5 * 60
  },
  "Keikyu.Zushi.Mutsuura": {
    "Keikyu.Main.KanazawaHakkei": 1 * 60
  },
  "Keikyu.Kurihama.Shinotsu": {
    "Keikyu.Main.Horinouchi": 1 * 60
  },
  "Keikyu.Main.KanazawaHakkei": {
    "Keikyu.Main.KanazawaBunko": 1 * 60
  },
  "Keio.KeioNew.Hatagaya": {
    "Keio.Keio.Sasazuka": 1 * 60
  },
  "Keio.Dobutsuen.TamaDobutsukoen": {
    "Keio.Keio.Takahatafudo": 2 * 60
  },
  "Keio.Keio.SeisekiSakuragaoka": {
    "Keio.Keio.Takahatafudo": 3 * 60
  },
  "Keio.Keio.Minamidaira": {
    "Keio.Keio.Takahatafudo": 3 * 60,
  },
  "Keio.Takao.KeioKatakura": {
    "Keio.Keio.Kitano": 2 * 60
  },
  "Keio.Takao.Mejirodai": {
    "Keio.Keio.Kitano": 4 * 60
  },
  "Keio.Sagamihara.KeioTamagawa": {
    "Keio.Keio.Chofu": 2 * 60
  },
  "Keio.Sagamihara.KeioInadazutsumi": {
    "Keio.Keio.Chofu": 3 * 60
  },
  "Keio.Sagamihara.KeioNagayama": {
    "Keio.Sagamihara.KeioTamaCenter": 2 * 60
  },
  "Keio.Sagamihara.KeioHorinouchi": {
    "Keio.Sagamihara.KeioTamaCenter": 2 * 60
  },
  "Keisei.Oshiage.KeiseiTateishi": {
    "Keisei.Main.Aoto": 2 * 60
  },
  "Keisei.Oshiage.Oshiage": {
    "Keisei.Main.Aoto": 5 * 60
  },
  "Keisei.HigashiNarita.HigashiNarita": {
    "Keisei.Main.KeiseiNarita": 5 * 60
  },
  "Keisei.Chiba.KeiseiMakuharihongo": {
    "Keisei.Main.KeiseiTsudanuma": 3 * 60
  },
  "Seibu.Tamako.MusashiYamato": {
    "Seibu.Haijima.Hagiyama": 2 * 60
  },
  "Seibu.Tamako.Yasaka": {
    "Seibu.Haijima.Hagiyama": 1 * 60
  },
  "Seibu.Sayama.ShimoYamaguchi": {
    "Seibu.Ikebukuro.NishiTokorozawa": 3 * 60
  },
  "Seibu.SeibuYurakucho.ShinSakuradai": {
    "Seibu.Ikebukuro.Nerima": 2 * 60
  },
  "Seibu.Shinjuku.KamiShakujii": {
    "Seibu.Shinjuku.Tanashi": 3 * 60,
  },
  "Seibu.Shinjuku.Saginomiya": {
    "Seibu.Shinjuku.KamiShakujii": 3 * 60
  },
  "Seibu.Shinjuku.Tokorozawa": {
    "Seibu.Shinjuku.ShinTokorozawa": 3 * 60
  },
  "Seibu.Ikebukuro.Nerima": {
    "Seibu.Ikebukuro.ShakujiiKoen": 3 * 60
  },
  "Seibu.Ikebukuro.ShakujiiKoen": {
    "Seibu.Ikebukuro.Hibarigaoka": 5 * 60
  },
  "Seibu.Ikebukuro.Hibarigaoka": {
    "Seibu.Ikebukuro.Tokorozawa" : 7 * 60
  },
  "Seibu.Toshima.Toshimaen": {
    "Seibu.Ikebukuro.Nerima": 2 * 60
  },
  "Seibu.Haijima.Hagiyama": {
    "Seibu.Shinjuku.Kodaira": 2 * 60
  },
  "Seibu.Haijima.Kodaira": {
    "Seibu.Tamako.Hagiyama": 1 * 60
  },
  "Tokyu.Oimachi.FutakoTamagawa": {
    "Tokyu.DenEnToshi.Mizonokuchi": 2 * 60
  }
}

export const staticTravelTimes: {[from: string]: {[to: string]: {[trainType: string]: number}}} = {
  "Keikyu.Main.Shinagawa": {
    "Keikyu.Airport.HanedaAirportTerminal3": {"Keikyu.AirportRapidLimitedExpress": 12 * 60},
  },
  "Keikyu.Airport.HanedaAirportTerminal3": {
    "Keikyu.Main.Shinagawa": {"Keikyu.AirportRapidLimitedExpress": 11 * 60},
  },
  "Keikyu.Kurihama.Miurakaigan": {
    "Keikyu.Main.YokosukaChuo": {"Keikyu.MorningWing": 21 * 60}
  },
  "Keio.Dobutsuen.TamaDobutsukoen": {"Keio.Dobutsuen.Takahatafudo": {"Keio.Local": 3 * 60}},
  "Keio.Dobutsuen.Takahatafudo": {"Keio.Dobutsuen.TamaDobutsukoen": {"Keio.Local": 3 * 60}},
  "Keio.Keibajo.FuchukeibaSeimommae": {"Keio.Keibajo.HigashiFuchu": {"Keio.Local": 3 * 60}},
  "Keio.Keibajo.HigashiFuchu": {"Keio.Keibajo.FuchukeibaSeimommae": {"Keio.Local": 3 * 60}},
  "Keio.Keio.Shinjuku":{ 
    "Keio.Sagamihara.KeioNagayama": {"Keio.KeioLiner": 27 * 60},
    "Keio.Takao.Takaosanguchi": {"Keio.KeioLiner": 49 * 60}
  },
  "Keio.Keio.Meidaimae":{ 
    "Keio.Sagamihara.KeioNagayama": {"Keio.KeioLiner": 19 * 60},
    "Keio.Takao.Takaosanguchi": {"Keio.KeioLiner": 44 * 60}
  },
  "Keio.Sagamihara.KeioNagayama": {"Keio.Keio.Shinjuku": {"Keio.KeioLiner": 30 * 60}},
  "Keisei.HigashiNarita.KeiseiNarita": {"Keisei.HigashiNarita.HigashiNarita": {
    "Keisei.Local": 6 * 60, "Keisei.Rapid": 6 * 60, "Keisei.LimitedExpress": 6 * 60, 
    "Keisei.RapidLimitedExpress": 6 * 60, "Keisei.CommuterLimitedExpress": 6 * 60
  }},
   "Keisei.HigashiNarita.HigashiNarita": {"Keisei.HigashiNarita.KeiseiNarita": {
    "Keisei.Local": 6 * 60, "Keisei.Rapid": 6 * 60, "Keisei.LimitedExpress": 6 * 60, 
    "Keisei.RapidLimitedExpress": 6 * 60, "Keisei.CommuterLimitedExpress": 6 * 60
  }},
  "Keisei.Main.KeiseiFunabashi": {
    "Keisei.Main.KeiseiNarita": {"Keisei.Eveningliner": 32 * 60},
    "Keisei.Main.NaritaAirportTerminal1": {"Keisei.Eveningliner": 44 * 60},
    "Keisei.Main.KeiseiUeno": {"Keisei.Morningliner": 31 * 60},
  },
  "Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3": {"Keisei.Main.Nippori": {"Keisei.Skyliner": 38 * 60}},
  "Keisei.Main.Aoto": {"Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3": {"Keisei.Skyliner": 29 * 60}},
  "Keisei.Main.KeiseiNarita": {"Keisei.Main.NaritaAirportTerminal1": {"Keisei.Eveningliner": 10 * 60}},
  "Keisei.Main.Nippori": {"Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3": {"Keisei.Skyliner": 37 * 60}},
  "Keisei.Oshiage.Aoto": {"Keisei.Oshiage.Oshiage": {
    "Keisei.RapidLimitedExpress": 7 * 60,
    "Keisei.AccessExpress": 7 * 60,
    "Keisei.Rapid": 7 * 60,
    "Keisei.CommuterLimitedExpress": 7 * 60,
    "Keisei.LimitedExpress": 7 * 60,
  }},
  "Keisei.Oshiage.Oshiage": {"Keisei.Oshiage.Aoto": {
    "Keisei.RapidLimitedExpress": 6 * 60,
    "Keisei.AccessExpress": 6 * 60,
    "Keisei.LimitedExpress": 6 * 60,
    "Keisei.Rapid": 6 * 60,
    "Keisei.CommuterLimitedExpress": 6 * 60,
  }},
  "Seibu.Ikebukuro.Hanno": {
    "Seibu.SeibuChichibu.Yokoze": {"Seibu.LimitedExpress": 32 * 60},
    "Seibu.SeibuChichibu.SeibuChichibu": {"Seibu.S-TRAIN": 35 * 60}
  },
  "Seibu.Ikebukuro.ShakujiiKoen": {
    "TokyoMetro.Fukutoshin.Ikebukuro": {"Seibu.S-TRAIN": 14 * 60},
    "TokyoMetro.Yurakucho.Iidabashi": {"Seibu.S-TRAIN": 25 * 60},
  },
  "Seibu.Seibuen.Seibuen": {"Seibu.Seibuen.HigashiMurayama": {"Seibu.Local": 3 * 60}},
  "Seibu.Seibuen.HigashiMurayama": {"Seibu.Seibuen.Seibuen": {"Seibu.Local": 3 * 60}},
  "Seibu.SeibuChichibu.Yokoze": {
    "Seibu.Ikebukuro.Hanno": {"Seibu.LimitedExpress": 34 * 60}
  },
  "Seibu.SeibuChichibu.SeibuChichibu": {"Seibu.Ikebukuro.Hanno": {"Seibu.S-TRAIN": 15 * 60}},
  "Seibu.SeibuYurakucho.KotakeMukaihara": {"Seibu.SeibuYurakucho.Nerima": {"Seibu.RapidExpress": 4 * 60}},
  "Seibu.SeibuYurakucho.Nerima": {"Seibu.SeibuYurakucho.KotakeMukaihara": {"Seibu.RapidExpress": 4 * 60}},
  "Seibu.Shinjuku.Takadanobaba": {"Seibu.Shinjuku.Kodaira": {"Seibu.HaijimaLiner": 23 * 60}},
  "Seibu.Toshima.Toshimaen": {"Seibu.Toshima.Nerima": {"Seibu.Local": 3 * 60}},
  "Seibu.Toshima.Nerima": {"Seibu.Toshima.Toshimaen": {"Seibu.Local": 2 * 60}},
}