-- @block
select st.railway,
  st.rail_direction,
  st.calendar,
  sto.train_type,
  sto.train_number,
  sto.destination_station,
  st.station,
  array_agg(
    sto.departure_time
    order by sto.departure_time
  )
from odpt.station_timetable st
  left join odpt.train_timetable tt on st.railway = tt.railway
  left join odpt.station_timetable_object sto on sto.station_timetable = st.id
where tt.railway is null
group by st.railway,
  st.rail_direction,
  st.calendar,
  sto.train_type,
  sto.train_number,
  sto.destination_station,
  st.station
order by st.railway,
  st.rail_direction,
  st.calendar,
  sto.train_type,
  sto.train_number,
  sto.destination_station,
  st.station;
-- @block
select bp.id,
  bp.title,
  count(*),
  array_agg(distinct bt.busroute_pattern),
  array_agg(distinct ksjbp.id)
from odpt.bus_timetable_object bto
  left join odpt.bus_timetable bt on bt.id = bto.bus_timetable
  left join odpt.busstop_pole bp on bto.busstop_pole = bp.id
  left join ksj.busstop ksjbp on ksjbp.busstopname = bp.title
where bp.location is null
group by bp.id;
-- @block
select brp.*,
  array_length(array_agg(distinct bt.id), 1) as timetables,
  array_length(array_agg(distinct bsp.id), 1) as stops,
  array_length(
    array_agg(distinct bsp.id) filter (
      where bsp.location is null
    ),
    1
  ) as null_stops
from odpt.busroute_pattern brp
  left join odpt.bus_timetable bt on bt.busroute_pattern = brp.id
  left join odpt.busstop_pole_order bpo on bpo.busroute_pattern = brp.id
  left join odpt.busstop_pole bsp on bpo.busstop_pole = bsp.id
where brp.operator = 'KokusaiKogyoBus'
  and bt.id is not null
group by brp.id;
-- @block
select *,
  st_asText(location)
from odpt.bussttop_pole_order bpo
  left join odpt.busstop_pole bp on bpo.busstop_pole = bp.id
where busroute_pattern in (
    'KokusaiKogyoBus.Kawa14-2.52314200.1',
    'KokusaiKogyoBus.Kawa15-3.52315301.1'
  );
-- @block
select *
from odpt.busroute_pattern bp
where id = 'KeioBus.Chou01Ko.381.2';
-- @block
select *,
  st_asText(location)
from odpt.busstop_pole
where title in ('南高麗小学校')
  or id = 'KokusaiKogyoBus.HannouEki.5001.10';
-- @block
select *
from odpt.station
where id like 'Chichibu.%';
-- @block
select st.station,
  st.calendar,
  st.rail_direction,
  sto.train,
  sto.train_type,
  sto.train_number,
  sto.destination_station,
  sto.train_name,
  sto.via_railway,
  count(sto.departure_time),
  array_agg(sto.departure_time),
  array_agg(sto.is_last),
  array_agg(sto.is_origin) -- select st.*, sto.*
from odpt.station_timetable st
  left join odpt.station_timetable_object sto on sto.station_timetable = st.id
where st.railway = 'Keikyu.Airport'
  and st.rail_direction = 'Outbound'
group by st.station,
  st.calendar,
  st.rail_direction,
  sto.train,
  sto.train_type,
  sto.train_number,
  sto.destination_station,
  sto.train_name,
  sto.via_railway ;
-- @block
select station,
  departure_time,
  destination_station [1] as destination,
  train_type
from odpt.station_timetable st
  left join odpt.station_timetable_object sto on sto.station_timetable = st.id
where station like 'Keikyu.Main%'
  and rail_direction = 'Inbound'
  and departure_time > '18:00'
  and destination_station [1] = 'Keisei.Oshiage.Aoto'
  and calendar = 'SaturdayHoliday';
-- @block
select *
from odpt.train_timetable
limit 10;
-- @block
select coalesce(tt1.departure_time, tt1.arrival_time) - coalesce(tt0.arrival_time, tt0.departure_time) as time,
  tt0.*,
  tt1.*
from odpt.train_timetable_object tt0
  inner join odpt.train_timetable tt on tt0.train_timetable = tt.id
  inner join odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
  and tt1.departure_station = 'Keikyu.Airport.HanedaAirportTerminal3'
where tt0.departure_station = 'Keikyu.Airport.HanedaAirportTerminal1and2'
  and tt1.i = tt0.i + 1;
-- @block
delete from odpt.train_timetable_object tt
where tt.train_timetable like '%Generated%';
-- @block
delete from odpt.train_timetable tt
where tt.id like '%Generated%';
-- @block
select *
from odpt.train_timetable_object tt
where tt.train_timetable like '%Generated%';
-- @block
select *
from odpt.train_timetable tt
where tt.id like '%Generated%';
-- @block
select 
  s.title as name,
  s.translations->'en' as name_en,
  s.translations->'en' as "name:latin",
  s.title as "name:nonlatin",
  ST_AsEWKT(ST_Centroid(ST_Union(location::geometry))),
  sum(passengers)
from (
    select station [1] as station,
      (
        passenger_survey_object->-1->'odptPassengerJourneys'
      )::integer * case
        when include_alighting then 1
        else 2
      end as passengers
    from odpt.passenger_survey
  ) as i
  join odpt.station s on s.id = station
  group by s.title, s.translations->'en'
  --having ST_Area(ST_MinimumBoundingCircle(ST_Union(location::geometry))) < 0.0001
  order by sum(passengers);
-- @block
select st.station,
  st.rail_direction,
  sto.departure_time,
  r.ascending_rail_direction
from odpt.station_timetable_object sto
  inner join odpt.station_timetable st on st.id = sto.station_timetable
  inner join odpt.railway r on r.id = 'Keikyu.Airport'
  inner join odpt.station_order so on so.railway = r.id
  and so.station = st.station
where sto.destination_station = '{Keikyu.Kurihama.KeikyuKurihama}'
  and sto.train_type = 'Keikyu.LimitedExpress'
  and st.calendar = 'SaturdayHoliday'
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
          inner join odpt.railway r on r.id = 'Keikyu.Airport'
          inner join odpt.station_order so on so.railway = r.id
          and so.station = st.station
        where sto.destination_station = '{Keikyu.Kurihama.KeikyuKurihama}'
          and sto.train_type = 'Keikyu.LimitedExpress'
          and st.calendar = 'SaturdayHoliday'
          and st.station LIKE 'Keikyu.Airport%'
      ) as departures
    group by rail_direction,
      ascending_rail_direction
  );
-- @block

select connecting_railway from odpt.station where id like 'Tokyu.DenEnToshi.Mizonokuchi';
--@block

select *
from odpt.station_timetable_object sto
where
station_timetable like 'Keisei.Main.Aoto.Outbound.SaturdayHoliday'
--  destination_station = '{Keisei.Oshiage.Aoto}'
--  and train_type = 'Keikyu.AirportRapidLimitedExpress'
  order by station_timetable, departure_time

-- @block
select *
from odpt.train_timetable_object tto
inner join odpt.train_timetable tt on tto.train_timetable = tt.id
inner join odpt.train_timetable_object ttx on ttx.train_timetable = tt.id
where tto.arrival_station = 'TokyoMetro.Yurakucho.Iidabashi'
  and train_type = 'TokyoMetro.S-TRAIN'

-- @block

select st.station,
  st.rail_direction,
  sto.departure_time
from odpt.station_timetable_object sto
  inner join odpt.station_timetable st on st.id = sto.station_timetable
where sto.destination_station = '{Keikyu.Main.KanazawaBunko}'
  and sto.train_type = 'Keikyu.LimitedExpress'
  and st.calendar = 'Weekday'
  and st.station = 'Keikyu.Main.KanazawaHakkei'
  and sto.note -> 'ja' = null;

-- @block
select *
from odpt.station_timetable_object sto
inner join odpt.station_timetable st on st.id = sto.station_timetable
where sto.destination_station = '{Seibu.Ikebukuro.Hanno}'
  and st.calendar = 'SaturdayHoliday'
  and st.station like 'Seibu.Ikebukuro.Hibarigaoka'

-- @block

select tt.id, tto.arrival_time, tto.departure_time, tt.origin_station from odpt.train_timetable_object tto
inner join odpt.train_timetable tt on tt.id = tto.train_timetable
where tt.calendar = 'SaturdayHoliday'
  and tto.departure_station = any(
    select id from odpt.station s where ST_DistanceSphere(location::geometry, (select location::geometry from odpt.station where id = 'Keisei.Oshiage.Oshiage')) < 200
  )
  and tt.destination_station = '{Keikyu.Airport.HanedaAirportTerminal1and2}'
  and tto.i = 0
  and tt.previous_train_timetable is null
  and tto.departure_time > '22:09'
order by abs(tto.departure_time - '22:16')

-- @block

select * 
FROM odpt.train_timetable_object
where train_timetable in (
  'JR-East.Musashino.2753M.Weekday',
  'JR-East.ShonanShinjuku.2753M.Weekday',
  'JR-East.Musashino.903E.Weekday',
  'JR-East.Keiyo.903E.Weekday'
);
-- @block

select tto.*
FROM odpt.train_timetable tt
LEFT JOIN odpt.train_type on tt.train_type = odpt.train_type.id
LEFT JOIN odpt.rail_direction rd on tt.rail_direction = rd.id
LEFT JOIN odpt.railway r on tt.railway = r.id
LEFT JOIN odpt.train_timetable_object tto 
  on tt.id = tto.train_timetable and (
    COALESCE(tto.arrival_station, tto.departure_station) not LIKE (r.id || '.%') or
    COALESCE(tto.arrival_station, tto.departure_station) = 'JR-East.Keiyo.NishiFunabashi'
  )
where tt.id = 'JR-East.Joban.14M.SaturdayHoliday'

-- @block
  select 
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
  order by coalesce(departure_time, arrival_time) desc

-- @block

select *
from odpt.train_timetable tt
inner join odpt.train_timetable_object tto on tto.train_timetable = tt.id
where tt.destination_station = '{SaitamaRailway.SaitamaRailway.UrawaMisono}'
  and coalesce(tto.departure_station, tto.arrival_station) = 'Tokyu.DenEnToshi.Shibuya'
  and tt.calendar = 'Weekday'
  and previous_train_timetable is null
  and (origin_station is null or origin_station[1] != 'Tokyu.DenEnToshi.Shibuya')
  and coalesce(departure_time, arrival_time) >= '13:00:00'
order by coalesce(departure_time, arrival_time) asc

-- @block

select coalesce(tto.departure_station, tto.arrival_station), tt.railway, count(1)
from odpt.train_timetable tt
inner join odpt.train_timetable_object tto on tto.train_timetable = tt.id
inner join odpt.station s on coalesce(tto.departure_station, tto.arrival_station) = s.id
where tt.railway != s.railway
group by coalesce(tto.departure_station, tto.arrival_station), tt.railway

-- @block

select distinct * from gtfs.shapes ORDER BY shape_id, shape_pt_sequence;

-- @block

select * 
from odpt.train_timetable_object tto
inner join odpt.train_timetable tt on tto.train_timetable = tt.id
where departure_station = 'TokyoMetro.Yurakucho.Iidabashi'
  and tt.destination_station = '{Seibu.Ikebukuro.Kotesashi}'
order by departure_time

-- @block

select * from odpt.busroute_pattern