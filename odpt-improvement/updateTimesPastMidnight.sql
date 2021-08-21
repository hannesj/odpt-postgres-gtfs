
UPDATE odpt.train_timetable_object
  SET departure_time = departure_time + '24:00:00'
WHERE departure_time < '03:00:00';


UPDATE odpt.train_timetable_object
  SET arrival_time = arrival_time + '24:00:00'
WHERE arrival_time < '03:00:00';


UPDATE odpt.station_timetable_object
  SET departure_time = departure_time + '24:00:00'
WHERE departure_time < '03:00:00';


UPDATE odpt.bus_timetable_object bto
  SET arrival_time = arrival_time + '24:00:00'
FROM (
  select bto.bus_timetable, bto.i from (
    select bto.* , min(i) OVER (PARTITION BY bus_timetable) as origin
    from odpt.bus_timetable_object bto
  ) as bto
  inner join odpt.bus_timetable_object bto0 on bto.bus_timetable = bto0.bus_timetable and bto.origin = bto0.i
  where bto.arrival_time < bto0.departure_time
) AS updateables(bus_timetable, i)
WHERE bto.bus_timetable = updateables.bus_timetable AND bto.i = updateables.i;


UPDATE odpt.bus_timetable_object bto
  SET departure_time = departure_time + '24:00:00'
FROM (
  select bto.bus_timetable, bto.i from (
    select bto.* , min(i) OVER (PARTITION BY bus_timetable) as origin
    from odpt.bus_timetable_object bto
  ) as bto
  inner join odpt.bus_timetable_object bto0 on bto.bus_timetable = bto0.bus_timetable and bto.origin = bto0.i
  where bto.departure_time < bto0.departure_time
) AS updateables(bus_timetable, i)
WHERE bto.bus_timetable = updateables.bus_timetable AND bto.i = updateables.i;
