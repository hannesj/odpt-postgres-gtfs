UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('22:46:00', '23:01:00', '23:16:00', '23:31:00', '23:45:00', '24:01:00', '24:18:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:29:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('08:45:00', '08:54:00', '09:01:00', '21:52:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:23:00', '22:09:00', '22:28:00', '22:39:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:33:00', '08:56:00', '10:32:00', '10:52:00', '11:12:00', '11:32:00', '11:52:00', '12:12:00', '12:32:00', '12:52:00', '13:12:00', '13:32:00', '13:52:00', '14:12:00', '14:32:00', '14:52:00', '15:12:00', '16:49:00', '17:29:00', '18:09:00', '19:09:00', '20:09:00', '21:09:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.KeioNew.Shinjuku.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:56:00', '17:10:00', '21:11:00', '21:51:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:31:00', '23:46:00', '24:01:00', '24:18:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('08:49:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Shinjuku.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:12:00', '15:23:00', '15:45:00', '16:29:00', '17:03:00', '17:29:00', '18:03:00', '18:28:00', '19:03:00', '19:43:00', '20:03:00', '20:28:00', '20:43:00', '21:03:00', '21:28:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.KeioNew.Hatsudai.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:58:00', '17:12:00', '21:13:00', '21:53:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.KeioNew.Hatagaya.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:59:00', '17:13:00', '21:14:00', '21:54:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('22:51:00', '23:06:00', '23:21:00', '23:36:00', '23:50:00', '24:05:00', '24:23:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:35:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:28:00', '08:02:00', '17:17:00', '21:17:00', '21:57:00', '22:14:00', '22:33:00', '22:45:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:38:00', '09:03:00', '10:37:00', '10:57:00', '11:17:00', '11:37:00', '11:57:00', '12:17:00', '12:37:00', '12:57:00', '13:17:00', '13:37:00', '13:57:00', '14:17:00', '14:37:00', '14:57:00', '15:17:00', '16:54:00', '17:34:00', '18:14:00', '19:14:00', '20:14:00', '21:14:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:35:00', '23:51:00', '24:06:00', '24:23:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sasazuka.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:17:00', '15:29:00', '15:49:00', '16:33:00', '17:09:00', '17:34:00', '18:09:00', '18:33:00', '19:09:00', '19:48:00', '20:09:00', '20:33:00', '20:48:00', '21:09:00', '21:33:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('22:53:00', '23:09:00', '23:24:00', '23:39:00', '23:53:00', '24:09:00', '24:25:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:37:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('08:52:00', '09:00:00', '09:08:00', '21:58:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:31:00', '08:05:00', '17:20:00', '21:20:00', '22:00:00', '22:17:00', '22:35:00', '22:48:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:41:00', '09:06:00', '10:40:00', '11:00:00', '11:20:00', '11:40:00', '12:00:00', '12:20:00', '12:40:00', '13:00:00', '13:20:00', '13:40:00', '14:00:00', '14:20:00', '14:40:00', '15:00:00', '15:20:00', '16:56:00', '17:36:00', '18:16:00', '19:16:00', '20:16:00', '21:16:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:38:00', '23:53:00', '24:09:00', '24:25:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('08:54:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Meidaimae.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:20:00', '15:32:00', '15:52:00', '16:36:00', '17:12:00', '17:37:00', '18:12:00', '18:37:00', '19:12:00', '19:50:00', '20:12:00', '20:37:00', '20:50:00', '21:12:00', '21:37:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Sakurajosui.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:33:00', '08:09:00', '17:24:00', '21:24:00', '22:04:00', '22:19:00', '22:40:00', '22:51:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('22:58:00', '23:14:00', '23:29:00', '23:44:00', '23:58:00', '24:14:00', '24:30:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:41:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:37:00', '08:15:00', '17:29:00', '21:28:00', '22:08:00', '22:22:00', '22:44:00', '22:55:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:47:00', '09:11:00', '10:44:00', '11:04:00', '11:24:00', '11:44:00', '12:04:00', '12:24:00', '12:44:00', '13:04:00', '13:24:00', '13:44:00', '14:04:00', '14:24:00', '14:44:00', '15:04:00', '15:24:00', '17:01:00', '17:41:00', '18:21:00', '19:21:00', '20:21:00', '21:21:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:43:00', '23:58:00', '24:13:00', '24:30:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.ChitoseKarasuyama.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:24:00', '15:38:00', '15:57:00', '16:40:00', '17:19:00', '17:41:00', '18:19:00', '18:41:00', '19:19:00', '19:57:00', '20:19:00', '20:41:00', '20:57:00', '21:19:00', '21:41:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Tsutsujigaoka.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:40:00', '08:18:00', '17:33:00', '21:32:00', '22:12:00', '22:26:00', '22:47:00', '22:58:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Chofu.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:03:00', '23:19:00', '23:35:00', '23:50:00', '24:04:00', '24:19:00', '24:35:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Chofu.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:47:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Chofu.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:05:00', '09:13:00', '09:21:00', '22:10:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Chofu.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:48:00', '24:04:00', '24:18:00', '24:35:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Chofu.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:45:00', '08:22:00', '17:41:00', '21:41:00', '22:21:00', '22:30:00', '22:51:00', '23:04:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Chofu.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:55:00', '09:18:00', '10:50:00', '11:10:00', '11:30:00', '11:50:00', '12:10:00', '12:30:00', '12:50:00', '13:10:00', '13:30:00', '13:50:00', '14:10:00', '14:30:00', '14:50:00', '15:10:00', '15:30:00', '17:07:00', '17:50:00', '18:30:00', '19:30:00', '20:30:00', '21:30:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Chofu.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:06:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Chofu.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:30:00', '15:44:00', '16:04:00', '16:46:00', '17:24:00', '17:46:00', '18:24:00', '18:47:00', '19:24:00', '20:03:00', '20:24:00', '20:47:00', '21:03:00', '21:24:00', '21:47:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Fuchu.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:10:00', '23:26:00', '23:42:00', '23:56:00', '24:10:00', '24:24:00', '24:41:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Fuchu.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:52:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Fuchu.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:12:00', '09:20:00', '09:29:00', '22:17:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Fuchu.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:54:00', '24:09:00', '24:24:00', '24:41:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Bubaigawara.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:12:00', '23:28:00', '23:44:00', '23:58:00', '24:12:00', '24:26:00', '24:43:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Bubaigawara.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:54:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Bubaigawara.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:14:00', '09:22:00', '09:31:00', '22:19:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.Bubaigawara.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:56:00', '24:11:00', '24:26:00', '24:43:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.SeisekiSakuragaoka.Outbound.Weekday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:15:00', '23:31:00', '23:47:00', '24:01:00', '24:15:00', '24:29:00', '24:46:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.SeisekiSakuragaoka.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('05:57:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.SeisekiSakuragaoka.Outbound.Weekday'
  and destination_station = '{Keio.Takao.Takaosanguchi}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:17:00', '09:26:00', '09:34:00', '22:23:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から各駅停車"'
WHERE 
  station_timetable = 'Keio.Keio.SeisekiSakuragaoka.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.KeioHachioji}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('23:59:00', '24:14:00', '24:29:00', '24:46:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioInadazutsumi.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:48:00', '08:26:00', '17:45:00', '21:44:00', '22:25:00', '22:34:00', '22:55:00', '23:08:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioInadazutsumi.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('08:58:00', '09:22:00', '10:53:00', '11:13:00', '11:33:00', '11:53:00', '12:13:00', '12:33:00', '12:53:00', '13:13:00', '13:33:00', '13:53:00', '14:13:00', '14:33:00', '14:53:00', '15:13:00', '15:33:00', '17:11:00', '17:54:00', '18:34:00', '19:34:00', '20:34:00', '21:34:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioInadazutsumi.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:09:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioInadazutsumi.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:33:00', '15:47:00', '16:07:00', '16:49:00', '17:27:00', '17:50:00', '18:27:00', '18:50:00', '19:27:00', '20:06:00', '20:27:00', '20:50:00', '21:06:00', '21:27:00', '21:50:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioNagayama.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.Express'
  and departure_time in ('07:55:00', '08:32:00', '17:52:00', '21:52:00', '22:32:00', '22:41:00', '23:02:00', '23:15:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioNagayama.Outbound.Weekday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:05:00', '09:29:00', '11:00:00', '11:20:00', '11:40:00', '12:00:00', '12:20:00', '12:40:00', '13:00:00', '13:20:00', '13:40:00', '14:00:00', '14:20:00', '14:40:00', '15:00:00', '15:20:00', '15:40:00', '17:18:00', '18:02:00', '18:42:00', '19:42:00', '20:42:00', '21:42:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioNagayama.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.LimitedExpress'
  and departure_time in ('09:16:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから各駅停車"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioNagayama.Outbound.SaturdayHoliday'
  and destination_station = '{Keio.Sagamihara.Hashimoto}'
  and train_type = 'Keio.SemiLimitedExpress'
  and departure_time in ('09:40:00', '15:54:00', '16:14:00', '16:56:00', '17:34:00', '17:56:00', '18:34:00', '18:56:00', '19:34:00', '20:12:00', '20:34:00', '20:56:00', '21:12:00', '21:34:00', '21:56:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Hashimoto.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('11:16:00', '11:36:00', '11:56:00', '12:16:00', '12:36:00', '12:56:00', '13:16:00', '13:36:00', '13:56:00', '14:16:00', '14:36:00', '14:56:00', '15:16:00', '15:36:00', '15:56:00', '18:00:00', '18:21:00', '19:01:00', '20:01:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから急行"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Hashimoto.Inbound.Weekday'
  and destination_station = '{Toei.Shinjuku.Motoyawata}'
  and train_type = 'Keio.Local'
  and departure_time = '21:09:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Hashimoto.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('07:16:00', '08:14:00', '09:14:00', '09:36:00', '09:56:00', '20:33:00', '20:54:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Tamasakai.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('11:19:00', '11:39:00', '11:59:00', '12:19:00', '12:39:00', '12:59:00', '13:19:00', '13:39:00', '13:59:00', '14:19:00', '14:39:00', '14:59:00', '15:19:00', '15:39:00', '15:59:00', '18:02:00', '18:23:00', '19:04:00', '20:04:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから急行"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Tamasakai.Inbound.Weekday'
  and destination_station = '{Toei.Shinjuku.Motoyawata}'
  and train_type = 'Keio.Local'
  and departure_time = '21:12:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.Tamasakai.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('07:18:00', '08:16:00', '09:17:00', '09:38:00', '09:58:00', '20:35:00', '20:56:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.MinamiOsawa.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('11:21:00', '11:41:00', '12:01:00', '12:21:00', '12:41:00', '13:01:00', '13:21:00', '13:41:00', '14:01:00', '14:21:00', '14:41:00', '15:01:00', '15:21:00', '15:41:00', '16:01:00', '18:04:00', '18:25:00', '19:06:00', '20:06:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから急行"'
WHERE 
  station_timetable = 'Keio.Sagamihara.MinamiOsawa.Inbound.Weekday'
  and destination_station = '{Toei.Shinjuku.Motoyawata}'
  and train_type = 'Keio.Local'
  and departure_time = '21:14:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.MinamiOsawa.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('07:20:00', '08:18:00', '09:19:00', '09:40:00', '10:00:00', '20:37:00', '20:58:00');



UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioHorinouchi.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('11:23:00', '11:43:00', '12:03:00', '12:23:00', '12:43:00', '13:03:00', '13:23:00', '13:43:00', '14:03:00', '14:23:00', '14:43:00', '15:03:00', '15:23:00', '15:43:00', '16:03:00', '18:07:00', '18:28:00', '19:08:00', '20:08:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから急行"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioHorinouchi.Inbound.Weekday'
  and destination_station = '{Toei.Shinjuku.Motoyawata}'
  and train_type = 'Keio.Local'
  and departure_time = '21:16:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"京王多摩センターから準特急"'
WHERE 
  station_timetable = 'Keio.Sagamihara.KeioHorinouchi.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('07:23:00', '08:21:00', '09:21:00', '09:43:00', '10:03:00', '20:40:00', '21:01:00');




UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.KeioHachioji.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '04:58:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.KeioHachioji.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('05:19:00', '08:25:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.KeioHachioji.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '04:59:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.KeioHachioji.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:19:00';



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Kitano.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:00:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Kitano.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('05:22:00', '08:28:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Kitano.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:01:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Kitano.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:22:00';



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Naganuma.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:02:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Naganuma.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('05:23:00', '08:29:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Naganuma.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:03:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Naganuma.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:23:00';



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.HirayamajoshiKoen.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:04:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.HirayamajoshiKoen.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('05:25:00', '08:31:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.HirayamajoshiKoen.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:05:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.HirayamajoshiKoen.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:25:00';



UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Minamidaira.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:06:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Minamidaira.Inbound.Weekday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time in ('05:27:00', '08:33:00');

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から特急"'
WHERE 
  station_timetable = 'Keio.Keio.Minamidaira.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:07:00';

UPDATE odpt.station_timetable_object
SET note = 'ja=>"高幡不動から準特急"'
WHERE 
  station_timetable = 'Keio.Keio.Minamidaira.Inbound.SaturdayHoliday'
  and destination_station = '{Keio.Keio.Shinjuku}'
  and train_type = 'Keio.Local'
  and departure_time = '05:27:00';