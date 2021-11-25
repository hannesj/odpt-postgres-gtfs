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

-- @block Find trips with only a single stop

select tt.*, tto.*
from odpt.train_timetable tt
inner join odpt.train_timetable_max_index maxindex on tt.id = maxindex.id
inner join odpt.train_timetable_min_index minindex on tt.id = minindex.id and maxindex.i = minindex.i
inner join odpt.train_timetable_object tto on tt.id = tto.train_timetable and tto.i = maxindex.i