INSERT INTO odpt.train_timetable_object (train_timetable, i, arrival_time, arrival_station)
select train_timetable, i, time, station
from (
  select distinct on (o1.train_timetable) o1.train_timetable as train_timetable,
    o1.i + 1 as i,
    s2.id as station,
    COALESCE(o2.arrival_time, o2.departure_time) as time,
    ST_Distance(s1.location, s2.location) as distance
  from odpt.train_timetable_object o1
    left join odpt.train_timetable tt on o1.train_timetable = tt.id
    left join odpt.station s1 on COALESCE(o1.arrival_station, o1.departure_station) = s1.id
    left join odpt.train_timetable_object o2 on o2.train_timetable = any(tt.next_train_timetable)
    inner join odpt.train_timetable_min_index mindex on o2.train_timetable = mindex.id and o2.i = mindex.i
    left join odpt.station s2 on COALESCE(o2.arrival_station, o2.departure_station) = s2.id
  where tt.next_train_timetable is not null and array_length(tt.next_train_timetable, 1) = 1
  order by o1.train_timetable,
    o1.i desc
  ) as distances
where distance > 200;