INSERT INTO gtfs.feed_info VALUES (DEFAULT);

INSERT INTO gtfs.agency (feed_index, agency_id, agency_name, agency_url, agency_timezone) 
SELECT feed.last_value as feed_index,
       o.id as agency_id,
       o.translations->'en' as agency_name,
       'http://' as agency_url,
       'Asia/Tokyo' as agency_timezone
FROM odpt.train_timetable tt
LEFT JOIN odpt.operator o on o.id = tt.operator
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
GROUP BY feed.last_value, o.id, o.title;

INSERT INTO gtfs.calendar (feed_index, service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) 
SELECT feed.last_value as feed_index,
       c.id as service_id,
       case when c.id in ('Monday', 'Weekday') then 1 else 0 end as monday,
       case when c.id in ('Tuesday', 'Weekday') then 1 else 0 end as tuesday,
       case when c.id in ('Wednesday', 'Weekday') then 1 else 0 end as wednesday,
       case when c.id in ('Thursday', 'Weekday') then 1 else 0 end as thursday,
       case when c.id in ('Friday', 'Weekday') then 1 else 0 end as friday,
       case when c.id in ('Saturday', 'SaturdayHoliday') then 1 else 0 end as saturday,
       case when c.id in ('Sunday', 'SaturdayHoliday', 'Holiday') then 1 else 0 end as sunday,
       coalesce(lower(c.duration), '2021-01-01') as start_date,
       coalesce(upper(c.duration), '2021-12-31') as end_date
FROM odpt.train_timetable tt
LEFT JOIN odpt.calendar c on c.id = tt.calendar
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
GROUP BY feed.last_value, c.id;

INSERT INTO gtfs.routes (feed_index, route_id, agency_id, route_short_name, route_long_name, route_type, route_color)
SELECT feed.last_value as feed_index,
       r.id as route_id,
       r.operator as agency_id,
       r.line_code as route_short_name,
       r.translations->'en' as route_long_name,
       1 as route_type,
       r.color as route_color
FROM odpt.train_timetable tt
LEFT JOIN odpt.railway r on r.id = tt.railway
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
GROUP BY feed.last_value, r.id;

INSERT INTO gtfs.stops (feed_index, stop_id, stop_name, stop_code, stop_lat, stop_lon)
SELECT feed.last_value as feed_index,
       s.id as stop_id,
       s.translations->'en' as stop_name,
       s.station_code as stop_code,
       ST_Y(location::geometry) as stop_lat,
       ST_X(location::geometry) as stop_lon
FROM odpt.train_timetable_object tt
LEFT JOIN odpt.station s on s.id = coalesce(tt.arrival_station, tt.departure_station)
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
GROUP BY feed.last_value, s.id;

INSERT INTO gtfs.shapes (feed_index, shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence)
SELECT feed.last_value as feed_index,
       (so.railway || '.' || ascending_rail_direction) as shape_id,
       ST_Y(location::geometry) as shape_pt_lat,
       ST_X(location::geometry) as shape_pt_lon,
       so.i as shape_pt_sequence
FROM odpt.station_order so
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
LEFT JOIN odpt.railway r on so.railway = r.id
LEFT JOIN odpt.station s on station = s.id
where ascending_rail_direction is not null
  and location is not null;

INSERT INTO gtfs.shapes (feed_index, shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence)
SELECT feed.last_value as feed_index,
       so.railway || '.' || descending_rail_direction as shape_id,
       ST_Y(location::geometry) as shape_pt_lat,
       ST_X(location::geometry) as shape_pt_lon,
       100 - so.i as shape_pt_sequence
FROM odpt.station_order so
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
LEFT JOIN odpt.railway r on so.railway = r.id
LEFT JOIN odpt.station s on station = s.id
where descending_rail_direction is not null
  and location is not null;


INSERT INTO gtfs.trips (feed_index, route_id, service_id, trip_id,trip_headsign, direction_id, shape_id)
SELECT feed.last_value as feed_index,
       tt.railway as route_id,
       tt.calendar as service_id,
       tt.id as trip_id,
       odpt.train_type.translations->'en' || ' to ' || array_to_string(array_agg(s.translations->'en'), '/') as trip_headsign,
       case 
         when r.ascending_rail_direction = rd.id then 0
         when r.descending_rail_direction = rd.id then 1
         else null
       end as direction_id,
       tt.railway || '.' || rd.id as shape_id
FROM odpt.train_timetable tt
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
LEFT JOIN odpt.train_type on tt.train_type = odpt.train_type.id
LEFT JOIN odpt.rail_direction rd on tt.rail_direction = rd.id
LEFT JOIN odpt.railway r on tt.railway = r.id
LEFT JOIN odpt.station s on s.id = any(destination_station)
GROUP BY feed.last_value, tt.id, odpt.train_type.id, r.id, rd.id;


INSERT INTO gtfs.stop_times (feed_index, trip_id, arrival_time, departure_time, stop_id, stop_sequence)
SELECT feed.last_value as feed_index,
       tto.train_timetable as trip_id,
       case when tto.arrival_time < '03:00:00' then tto.arrival_time::interval + '1 day'::interval else tto.arrival_time::interval end as arrival_time,
       case when tto.departure_time < '03:00:00' then tto.departure_time::interval + '1 day'::interval else tto.departure_time::interval end as departure_time,
       COALESCE(tto.arrival_station, tto.departure_station) as stop_id,
       tto.i as stop_sequence
FROM odpt.train_timetable_object tto
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
GROUP BY feed.last_value, tto.train_timetable, tto.i;


INSERT INTO gtfs.transfers (feed_index, from_stop_id, to_stop_id, from_trip_id, to_trip_id, transfer_type)
SELECT DISTINCT ON (id, to_trip_id)
       feed.last_value as feed_index,
       COALESCE(tt1.arrival_station, tt1.departure_station) as from_stop_id,
       COALESCE(tt2.arrival_station, tt2.departure_station) as to_stop_id,
       tt.id as from_trip_id,
       unnest(tt.next_train_timetable) as to_trip_id,
       4 as transfer_type
FROM odpt.train_timetable tt
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
LEFT JOIN odpt.train_timetable_object tt1 on tt1.train_timetable = tt.id
LEFT JOIN odpt.train_timetable_object tt2 on tt2.train_timetable = any(tt.next_train_timetable) and tt2.i = 0
GROUP BY feed.last_value, tt.id, tt1.train_timetable, tt1.i, tt2.train_timetable, tt2.i
order by id, to_trip_id, tt1.i desc;



INSERT INTO gtfs.agency (feed_index, agency_id, agency_name, agency_url, agency_timezone) 
SELECT feed.last_value as feed_index,
       o.id as agency_id,
       o.translations->'en' as agency_name,
       'http://' as agency_url,
       'Asia/Tokyo' as agency_timezone
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.operator o on o.id = bt.operator
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, o.id, o.title;

INSERT INTO gtfs.calendar (feed_index, service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) 
SELECT feed.last_value as feed_index,
       c.id as service_id,
       case when c.id in ('Monday', 'Weekday') then 1 else 0 end as monday,
       case when c.id in ('Tuesday', 'Weekday') then 1 else 0 end as tuesday,
       case when c.id in ('Wednesday', 'Weekday') then 1 else 0 end as wednesday,
       case when c.id in ('Thursday', 'Weekday') then 1 else 0 end as thursday,
       case when c.id in ('Friday', 'Weekday') then 1 else 0 end as friday,
       case when c.id in ('Saturday', 'SaturdayHoliday') then 1 else 0 end as saturday,
       case when c.id in ('Sunday', 'SaturdayHoliday', 'Holiday') then 1 else 0 end as sunday,
       coalesce(lower(c.duration), '2021-01-01') as start_date,
       coalesce(upper(c.duration), '2021-12-31') as end_date
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.calendar c on c.id = bt.calendar
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, c.id
ON CONFLICT DO NOTHING;

INSERT INTO gtfs.routes (feed_index, route_id, agency_id, route_short_name, route_type)
SELECT feed.last_value as feed_index,
       brp.busroute as route_id,
       brp.operator as agency_id,
       lcp(distinct brp.title) as route_short_name,
       3 as route_type
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.busroute_pattern brp on brp.id = bt.busroute_pattern
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, brp.busroute, brp.operator;

INSERT INTO gtfs.stops (feed_index, stop_id, stop_name, platform_code, stop_lat, stop_lon)
SELECT feed.last_value as feed_index,
       bp.id as stop_id,
       coalesce(bp.translations->'en', bp.kana) as stop_name,
       bp.busstop_pole_number as platform_code,
       ST_Y(location::geometry) as stop_lat,
       ST_X(location::geometry) as stop_lon
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, bp.id;

INSERT INTO gtfs.trips (feed_index, route_id, service_id, trip_id, trip_headsign, direction_id)
SELECT feed.last_value as feed_index,
       brp.busroute as route_id,
       bt.calendar as service_id,
       bt.id as trip_id,
       (array_agg(distinct destination_sign) filter (where destination_sign is not null) || array_agg(coalesce(bp.translations->'en', bp.kana) order by bto.i desc))[1] as trip_headsign,
       case when brp.direction is null then null else brp.direction::int - 1 end as direction_id
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
LEFT JOIN odpt.busroute_pattern brp on brp.id = bt.busroute_pattern
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, bt.id, brp.id;

INSERT INTO gtfs.stop_times (feed_index, trip_id, arrival_time, departure_time, stop_id, stop_sequence, pickup_type, drop_off_type, stop_headsign)
SELECT feed.last_value as feed_index,
       bto.bus_timetable as trip_id,
       case when bto.departure_time < '02:20:00' then bto.arrival_time::interval + '1 day'::interval else bto.arrival_time::interval end as arrival_time,
       case when bto.departure_time < '02:20:00' then bto.departure_time::interval + '1 day'::interval else bto.departure_time::interval end as departure_time,
       bto.busstop_pole as stop_id,
       bto.i as stop_sequence,
       case when bto.can_get_on = true then 0 when bto.can_get_on = false or bto.departure_time is null then 1 else null end as pickup_type,
       case when bto.can_get_off = true then 0 when bto.can_get_off = false then 1 else null end as drop_off_type,
       bto.destination_sign as stop_headsign
FROM odpt.bus_timetable_object bto
LEFT JOIN odpt.busstop_pole bp on bto.busstop_pole = bp.id
LEFT JOIN odpt.bus_timetable bt on bt.id = bto.bus_timetable
JOIN gtfs.feed_info_feed_index_seq feed on feed.last_value is not null
WHERE bp.location is not NULL
AND bt.operator not in ('SeibuBus', 'YokohamaMunicipal', 'Toei')
GROUP BY feed.last_value, bto.bus_timetable, bto.i;