-- @block Find stations without location with bus timetable
select busstop_pole
from odpt.bus_timetable_object
  left join odpt.busstop_pole on busstop_pole = id
where busstop_pole is not null
  and location is null
group by busstop_pole;
-- @block Find stations without location with busstop pole timetaable
select distinct busstop_pole
from odpt.busstop_pole_timetable
  left join odpt.busstop_pole on busstop_pole = busstop_pole.id
where busstop_pole is not null
  and location is null;