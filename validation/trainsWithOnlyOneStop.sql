-- @block Find trips with only a single stop
select train_timetable,
  array_agg(departure_station) || array_agg(arrival_station),
  array_agg(departure_time) || array_agg(arrival_time),
  train_timetable.destination_station,
  train_timetable.next_train_timetable,
  train_timetable.previous_train_timetable
from odpt.train_timetable_object
  join odpt.train_timetable on train_timetable = id
group by train_timetable,
  train_timetable.next_train_timetable,
  train_timetable.previous_train_timetable,
  train_timetable.destination_station
having count(i) = 1;