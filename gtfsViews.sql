
CREATE SCHEMA IF NOT EXISTS gtfs;

CREATE OR REPLACE FUNCTION gtfs.lcp_iterate(_state TEXT, value TEXT)
RETURNS TEXT
AS
$$
        SELECT  SUBSTRING($2, 1, s - 1)
        FROM    generate_series(1, LEAST(LENGTH($1), LENGTH($2))) s
        WHERE   SUBSTRING($1, 1, s) <> SUBSTRING($2, 1, s)
        UNION ALL
        SELECT  LEAST($1, $2)
        LIMIT 1;
$$
LANGUAGE 'sql';

CREATE OR REPLACE AGGREGATE gtfs.lcp(TEXT) (SFUNC = lcp_iterate, STYPE = TEXT);

CREATE OR REPLACE VIEW gtfs.agency AS
SELECT o.id as agency_id,
       o.title as agency_name,
       'http://' as agency_url,
       'Asia/Tokyo' as agency_timezone
FROM odpt.train_timetable tt
LEFT JOIN odpt.operator o on o.id = tt.operator
GROUP BY o.id, o.title
UNION
SELECT o.id as agency_id,
       o.title as agency_name,
       'http://' as agency_url,
       'Asia/Tokyo' as agency_timezone
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.operator o on o.id = bt.operator
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY o.id, o.title
ORDER BY agency_id;


CREATE OR REPLACE VIEW gtfs.calendar AS
SELECT c.id as service_id,
       case when c.id in ('Monday', 'Weekday') then 1 else 0 end as monday,
       case when c.id in ('Tuesday', 'Weekday') then 1 else 0 end as tuesday,
       case when c.id in ('Wednesday', 'Weekday') then 1 else 0 end as wednesday,
       case when c.id in ('Thursday', 'Weekday') then 1 else 0 end as thursday,
       case when c.id in ('Friday', 'Weekday') then 1 else 0 end as friday,
       case when c.id in ('Saturday', 'SaturdayHoliday') then 1 else 0 end as saturday,
       case when c.id in ('Sunday', 'SaturdayHoliday', 'Holiday') then 1 else 0 end as sunday,
       coalesce(to_char(lower(c.duration), 'YYYYMMDD'), '20210101') as start_date,
       coalesce(to_char(upper(c.duration), 'YYYYMMDD'), '20211231') as end_date
FROM odpt.train_timetable tt
LEFT JOIN odpt.calendar c on c.id = tt.calendar
GROUP BY c.id
ORDER BY service_id;


CREATE OR REPLACE VIEW gtfs.routes AS
SELECT r.id as route_id,
       r.operator as agency_id,
       r.line_code as route_short_name,
       r.title as route_long_name,
       1 as route_type, -- TODO
       r.color as route_color
FROM odpt.train_timetable tt
LEFT JOIN odpt.railway r on r.id = tt.railway
GROUP BY r.id
UNION
SELECT brp.busroute as route_id,
       brp.operator as agency_id,
       gtfs.lcp(distinct brp.title) as route_short_name,
       null as route_long_name,
       3 as route_type,
       null as route_color -- TODO: Base on agency
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.busroute_pattern brp on brp.id = bt.busroute_pattern
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY brp.busroute, brp.operator
ORDER BY route_id;


CREATE OR REPLACE VIEW gtfs.stops AS
SELECT s.id as stop_id,
       s.title as stop_name,
       s.station_code as stop_code,
       null as platform_code,
       ST_Y(location::geometry) as stop_lat,
       ST_X(location::geometry) as stop_lon
FROM odpt.train_timetable_object tt
LEFT JOIN odpt.station s on s.id = coalesce(tt.arrival_station, tt.departure_station)
GROUP BY s.id
UNION
SELECT bp.id as stop_id,
       bp.title as stop_name,
       null as stoop_code,
       bp.busstop_pole_number as platform_code,
       ST_Y(location::geometry) as stop_lat,
       ST_X(location::geometry) as stop_lon
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY bp.id
ORDER BY stop_id;


CREATE TABLE IF NOT EXISTS gtfs.shapes_manual (
  shape_id text NOT NULL,
  shape_pt_lat numeric(7, 5) NOT NULL,
  shape_pt_lon numeric(8, 5) NOT NULL,
  shape_pt_sequence integer NOT NULL,
  PRIMARY KEY (shape_id, shape_pt_sequence)
);

DELETE FROM gtfs.shapes_manual;

CREATE OR REPLACE VIEW gtfs.shapes AS
SELECT (so.railway || '.' || ascending_rail_direction) as shape_id,
       ST_Y(location::geometry) as shape_pt_lat,
       ST_X(location::geometry) as shape_pt_lon,
       so.i as shape_pt_sequence
FROM odpt.station_order so
LEFT JOIN odpt.railway r on so.railway = r.id
LEFT JOIN odpt.station s on station = s.id
where ascending_rail_direction is not null
  and location is not null
  and so.railway || '.' || ascending_rail_direction not in (
    select distinct shape_id from gtfs.shapes_manual
  )
UNION
SELECT so.railway || '.' || descending_rail_direction as shape_id,
       ST_Y(location::geometry) as shape_pt_lat,
       ST_X(location::geometry) as shape_pt_lon,
       100 - so.i as shape_pt_sequence
FROM odpt.station_order so
LEFT JOIN odpt.railway r on so.railway = r.id
LEFT JOIN odpt.station s on station = s.id
where descending_rail_direction is not null
  and location is not null
  and so.railway || '.' || descending_rail_direction not in (
    select distinct shape_id from gtfs.shapes_manual
  )
UNION
SELECT shape_id,
       shape_pt_lat,
       shape_pt_lon,
       shape_pt_sequence
FROM gtfs.shapes_manual
ORDER BY shape_id, shape_pt_sequence;


CREATE OR REPLACE VIEW gtfs.trips AS
SELECT tt.railway as route_id,
       tt.calendar as service_id,
       tt.id as trip_id,
       odpt.train_type.title || ' ' || array_to_string(array_agg(distinct s.title), '/') || '行き' as trip_headsign,
       case 
         when r.ascending_rail_direction = rd.id then 0
         when r.descending_rail_direction = rd.id then 1
         else null
       end as direction_id,
       tt.railway || '.' || rd.id || array_to_string(array_agg('_a_' || tto.arrival_station), '') || array_to_string(array_agg('_d_' || tto.departure_station), '') as shape_id
FROM odpt.train_timetable tt
LEFT JOIN odpt.train_type on tt.train_type = odpt.train_type.id
LEFT JOIN odpt.rail_direction rd on tt.rail_direction = rd.id
LEFT JOIN odpt.railway r on tt.railway = r.id
LEFT JOIN odpt.station s on s.id = any(destination_station)
LEFT JOIN odpt.train_timetable_object tto 
  on tt.id = tto.train_timetable and (
    COALESCE(tto.arrival_station, tto.departure_station) not LIKE (r.id || '.%') or
    COALESCE(tto.arrival_station, tto.departure_station) = 'JR-East.Keiyo.NishiFunabashi'
  )
GROUP BY tt.id, odpt.train_type.id, r.id, rd.id
UNION
SELECT brp.busroute as route_id,
       bt.calendar as service_id,
       bt.id as trip_id,
       (array_agg(distinct destination_sign) filter (where destination_sign is not null) || array_agg(bp.title order by bto.i desc))[1] as trip_headsign,
       case when brp.direction is null then null else brp.direction::int - 1 end as direction_id,
       null as shape_id
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.busroute_pattern brp on brp.id = bt.busroute_pattern
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY bt.id, brp.id
ORDER BY trip_id;

CREATE OR REPLACE VIEW gtfs.stop_times AS
SELECT tto.train_timetable as trip_id,
       COALESCE(tto.arrival_time, tto.departure_time) as arrival_time,
       COALESCE(tto.departure_time, tto.arrival_time) as departure_time,
       COALESCE(tto.arrival_station, tto.departure_station) as stop_id,
       tto.i as stop_sequence,
       case when tto.departure_time is null then 1 else null end as pickup_type,
       null as drop_off_type,
       null as stop_headsign
FROM odpt.train_timetable_object tto
GROUP BY tto.train_timetable, tto.i
UNION
SELECT bto.bus_timetable as trip_id,
       COALESCE(bto.arrival_time, bto.departure_time) as arrival_time,
       COALESCE(bto.departure_time, bto.arrival_time) as departure_time,
       bto.busstop_pole as stop_id,
       bto.i as stop_sequence,
       case when bto.can_get_on = true then 0 when bto.can_get_on = false or (bt.operator != 'TokyuBus' and bto.departure_time is null) then 1 else null end as pickup_type,
       case when bto.can_get_off = true then 0 when bto.can_get_off = false then 1 else null end as drop_off_type,
       bto.destination_sign as stop_headsign
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY bto.bus_timetable, bto.i, bt.operator
ORDER BY trip_id, stop_sequence;

CREATE OR REPLACE VIEW gtfs.transfers AS
SELECT DISTINCT ON (tt.id, to_trip_id)
       COALESCE(tt1.arrival_station, tt1.departure_station) as from_stop_id,
       COALESCE(tt2.departure_station, tt2.arrival_station) as to_stop_id,
       tt.id as from_trip_id,
       unnest(tt.next_train_timetable) as to_trip_id,
       4 as transfer_type
FROM odpt.train_timetable tt
INNER JOIN odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
INNER JOIN odpt.train_timetable_object tt2 on tt2.train_timetable = any(tt.next_train_timetable)
INNER JOIN odpt.train_timetable_min_index mindex on tt2.train_timetable = mindex.id and tt2.i = mindex.i
GROUP BY tt.id, tt1.train_timetable, tt1.i, tt2.train_timetable, tt2.i
ORDER BY tt.id, to_trip_id, tt1.i desc;
