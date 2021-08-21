
UPDATE odpt.station_timetable_object
SET note = 'ja=>"青砥に止まりません"'
WHERE 
  station_timetable = 'Keisei.Main.KeiseiUeno.Outbound.Weekday'
  and destination_station = '{Keisei.NaritaSkyAccess.NaritaAirportTerminal1}'
  and train_type = 'Keisei.Skyliner'
  and departure_time in ('05:40:00', '08:20:00', '09:40:00', '11:00:00', '12:20:00', '13:40:00', '15:00:00', '16:20:00', '17:40:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"青砥に止まりません"'
WHERE 
  station_timetable = 'Keisei.Main.Nippori.Outbound.Weekday'
  and destination_station = '{Keisei.NaritaSkyAccess.NaritaAirportTerminal1}'
  and train_type = 'Keisei.Skyliner'
  and departure_time in ('05:45:00', '08:25:00', '09:45:00', '11:05:00', '12:25:00', '13:45:00', '15:05:00', '16:25:00', '17:45:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"青砥に止まりません"'
WHERE 
  station_timetable = 'Keisei.Main.KeiseiUeno.Outbound.SaturdayHoliday'
  and destination_station = '{Keisei.NaritaSkyAccess.NaritaAirportTerminal1}'
  and train_type = 'Keisei.Skyliner'
  and departure_time in ('05:40:00', '08:20:00', '09:40:00', '11:00:00', '12:20:00', '13:40:00', '15:00:00', '16:20:00', '17:40:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"青砥に止まりません"'
WHERE 
  station_timetable = 'Keisei.Main.Nippori.Outbound.SaturdayHoliday'
  and destination_station = '{Keisei.NaritaSkyAccess.NaritaAirportTerminal1}'
  and train_type = 'Keisei.Skyliner'
  and departure_time in ('05:45:00', '08:25:00', '09:45:00', '11:05:00', '12:25:00', '13:45:00', '15:05:00', '16:25:00', '17:45:00');



UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Outbound.SaturdayHoliday'
  and destination_station = '{Keisei.Main.KeiseiNarita}'
  and train_type = 'Keisei.Rapid'
  and departure_time = '07:13:00';

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Outbound.SaturdayHoliday'
  and destination_station = '{Keisei.Main.KeiseiSakura}'
  and train_type = 'Keisei.Rapid'
  and departure_time in ('07:53:00', '08:18:00', '08:38:00', '08:59:00', '09:19:00', '10:03:00');

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Outbound.Weekday'
  and destination_station = '{Keisei.Main.KeiseiNarita}'
  and train_type = 'Keisei.Rapid'
  and departure_time in ('07:35:00', '07:54:00', '08:42:00');

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Outbound.Weekday'
  and destination_station = '{Keisei.Main.KeiseiSakura}'
  and train_type = 'Keisei.Rapid'
  and departure_time in ('08:21:00', '09:20:00', '09:42:00', '10:03:00');

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Outbound.Weekday'
  and destination_station = '{Keisei.Main.NaritaAirportTerminal1}'
  and train_type = 'Keisei.Rapid'
  and departure_time = '07:14:00';

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Inbound.Weekday'
  and destination_station = '{Keikyu.Airport.HanedaAirportTerminal1and2}'
  and train_type = 'Keisei.LimitedExpress'
  and departure_time in ('05:35:00', '05:52:00');

UPDATE odpt.station_timetable_object
SET is_origin = true
WHERE
  station_timetable = 'Keisei.Main.KeiseiTakasago.Inbound.Weekday'
  and destination_station = '{Toei.Asakusa.NishiMagome}'
  and train_type = 'Keisei.LimitedExpress'
  and departure_time in ('07:18:00', '07:38:00', '07:59:00', '08:18:00', '08:40:00');
