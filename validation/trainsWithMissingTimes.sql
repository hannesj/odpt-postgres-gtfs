select *
from odpt.train_timetable_object
where departure_station is not null
  and departure_time is null;
-- @block
select *
from odpt.train_timetable_object
where arrival_station is not null
  and arrival_time is null;