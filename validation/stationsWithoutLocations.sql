-- @block Find stations without location with train timetable
select distinct departure_station,
  station.location
from odpt.train_timetable_object
  left join odpt.station on departure_station = id
where departure_station is not null
  and location is null;
-- @block Find stations without location with station timetaable
select distinct station,
  station.location
from odpt.station_timetable
  left join odpt.station on station = station.id
where station is not null
  and location is null;