UPDATE odpt.train_timetable_object as o1
SET arrival_time = o2.departure_time
FROM odpt.train_timetable tt, odpt.station s1, odpt.train_timetable_object o2, odpt.station s2
where o1.arrival_station is not null
  and o1.arrival_time is null
  and array_length(tt.next_train_timetable, 1) = 1
  and ST_Distance(s1.location, s2.location) = 0
  and o1.train_timetable = tt.id
  and o1.arrival_station = s1.id
  and tt.next_train_timetable [1] = o2.train_timetable and o2.i = 0
  and o2.departure_station = s2.id;