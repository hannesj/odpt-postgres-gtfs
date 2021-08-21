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
select s.translations->'en' as name,
  ST_Y(location::geometry) as lat,
  ST_X(location::geometry) as lon,
  passengers
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
where passengers > 25000;
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
--station_timetable like 'Keisei.NaritaSkyAccess.%.Outbound.%'
  destination_station = '{Keisei.Oshiage.Aoto}'
  and train_type = 'Keikyu.AirportRapidLimitedExpress'
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


