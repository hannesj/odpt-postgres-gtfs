update odpt.station_timetable_object sto
set train_type = updated.train_type
from ( values
 ('04:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.Local'),
 ('05:28:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.LimitedExpress'),
 ('05:39:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('05:46:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('05:51:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('06:04:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('06:11:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('06:19:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.LimitedExpress'),
 ('06:24:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('06:33:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('06:42:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('06:49:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('06:54:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:00:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('07:08:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:11:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('07:18:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:22:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('07:26:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:31:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('07:35:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:40:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('07:45:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:52:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('07:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('08:03:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('08:08:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('08:14:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('08:18:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('08:24:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('08:29:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('08:35:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('08:40:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('08:46:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('08:51:00', 'Toei.Asakusa.Oshiage', 'Keikyu.LimitedExpress'),
 ('08:57:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:01:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('09:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('09:17:00', 'Toei.Asakusa.Oshiage', 'Keikyu.AirportExpress'),
 ('09:20:00', 'Keikyu.Main.Sengakuji', 'Keikyu.MorningWing'),
 ('09:23:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.LimitedExpress'),
 ('09:27:00', 'Toei.Asakusa.Oshiage', 'Keikyu.LimitedExpress'),
 ('09:29:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:33:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('09:39:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('09:42:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('09:48:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:53:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('09:58:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('10:02:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('10:10:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('10:13:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:20:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('10:23:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:27:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.RapidLimitedExpress'),
 ('10:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('10:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('10:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('10:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('10:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('11:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('11:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('11:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('12:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('12:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('12:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('12:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('12:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:52:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('12:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('13:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('13:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('13:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('13:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('13:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('14:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('14:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('14:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('14:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('14:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('14:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('14:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:47:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.RapidLimitedExpress'),
 ('14:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('14:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('15:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('15:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:37:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('15:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:00:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('16:07:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('16:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:19:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('16:29:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('16:33:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:38:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('16:46:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:51:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('16:56:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:01:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('17:06:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:13:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('17:18:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('17:25:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('17:30:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('17:35:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('17:40:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:45:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('17:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('17:56:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('18:01:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('18:05:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('18:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('18:16:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('18:20:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('18:25:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.AirportExpress'),
 ('18:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('18:36:00', 'Keisei.Main.KeiseiNarita', 'Keikyu.AirportExpress'),
 ('18:46:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('18:51:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('18:55:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('19:05:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('19:11:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.LimitedExpress'),
 ('19:15:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('19:24:00', 'Shibayama.Shibayama.ShibayamaChiyoda', 'Keikyu.AirportExpress'),
 ('19:29:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('19:35:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('19:44:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('19:49:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('19:55:00', 'Shibayama.Shibayama.ShibayamaChiyoda', 'Keikyu.AirportExpress'),
 ('20:03:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('20:08:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('20:14:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('20:21:00', 'Keisei.Main.KeiseiNarita', 'Keikyu.AirportExpress'),
 ('20:26:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('20:29:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('20:41:00', 'Shibayama.Shibayama.ShibayamaChiyoda', 'Keikyu.AirportExpress'),
 ('20:48:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('20:51:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('21:03:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('21:08:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.RapidLimitedExpress'),
 ('21:12:00', 'Shibayama.Shibayama.ShibayamaChiyoda', 'Keikyu.AirportRapidLimitedExpress'),
 ('21:21:00', 'Keisei.Main.KeiseiNarita', 'Keikyu.AirportExpress'),
 ('21:28:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('21:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('21:41:00', 'Shibayama.Shibayama.ShibayamaChiyoda', 'Keikyu.AirportRapidLimitedExpress'),
 ('21:48:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('21:52:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('21:59:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('22:02:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('22:12:00', 'Keisei.Main.KeiseiNarita', 'Keikyu.AirportExpress'),
 ('22:21:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('22:31:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('22:38:00', 'Keisei.Main.KeiseiNarita', 'Keikyu.AirportExpress'),
 ('22:46:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('22:49:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('22:59:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('23:08:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('23:14:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('23:20:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('23:32:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('23:43:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('24:01:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress')
) as updated(departure_time, destination_station, train_type)
where station_timetable = 'Keikyu.Main.Shinagawa.Inbound.Weekday'
  and updated.departure_time::interval = sto.departure_time 
  and updated.destination_station = sto.destination_station[1];


update odpt.station_timetable_object sto
set train_type = updated.train_type
from ( values
 ('04:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.Local'),
 ('05:28:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.LimitedExpress'),
 ('05:39:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('05:46:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('05:56:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('06:04:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('06:16:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.LimitedExpress'),
 ('06:28:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('06:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('06:41:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('06:47:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('06:53:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('06:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('07:04:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.LimitedExpress'),
 ('07:08:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('07:17:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('07:23:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:27:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('07:37:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('07:43:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('07:47:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('07:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('08:03:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('08:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('08:18:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('08:23:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('08:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('08:33:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('08:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('08:42:00', 'Keisei.Oshiage.Aoto', 'Keikyu.LimitedExpress'),
 ('08:46:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('08:53:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('08:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('09:03:00', 'Keisei.Main.KeiseiSakura', 'Keikyu.LimitedExpress'),
 ('09:07:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('09:13:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('09:17:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:22:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.LimitedExpress'),
 ('09:27:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportExpress'),
 ('09:33:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('09:38:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('09:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('09:45:00', 'Keisei.Main.NaritaAirportTerminal1', 'Keikyu.AirportExpress'),
 ('09:47:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('09:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('09:58:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('10:03:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('10:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('10:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('10:23:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('10:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('10:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('10:43:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('10:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('10:52:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('10:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('11:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('11:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('11:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('11:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('11:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('12:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('12:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('12:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('12:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('12:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('12:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('12:52:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('12:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('13:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('13:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:27:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.RapidLimitedExpress'),
 ('13:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('13:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('13:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('13:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('13:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('14:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('14:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('14:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('14:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('14:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('14:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('14:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('14:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('14:52:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('14:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('15:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:32:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('15:37:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('15:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('15:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('15:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('16:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('16:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('16:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('16:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('16:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('16:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('16:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('16:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('16:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('16:52:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('16:57:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('17:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('17:12:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:17:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('17:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('17:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('17:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:37:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('17:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('17:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('17:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('17:57:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('18:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('18:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('18:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('18:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('18:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('18:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('18:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('18:37:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.AirportRapidLimitedExpress'),
 ('18:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('18:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('18:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('18:57:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('19:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('19:07:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('19:12:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('19:17:00', 'Keisei.Oshiage.Aoto', 'Keikyu.AirportRapidLimitedExpress'),
 ('19:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('19:27:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('19:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('19:37:00', 'Hokuso.Hokuso.InzaiMakinohara', 'Keikyu.RapidLimitedExpress'),
 ('19:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('19:47:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('19:52:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('19:57:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('20:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('20:07:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('20:12:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('20:17:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('20:22:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('20:27:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('20:32:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('20:37:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('20:42:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('20:47:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('20:52:00', 'Toei.Asakusa.Oshiage', 'Keikyu.RapidLimitedExpress'),
 ('20:57:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('21:02:00', 'Keikyu.Main.Sengakuji', 'Keikyu.RapidLimitedExpress'),
 ('21:07:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('21:17:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('21:27:00', 'Keisei.NaritaSkyAccess.NaritaAirportTerminal1', 'Keikyu.RapidLimitedExpress'),
 ('21:37:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('21:42:00', 'Keisei.Oshiage.Aoto', 'Keikyu.RapidLimitedExpress'),
 ('21:47:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('21:56:00', 'Keikyu.Main.Sengakuji', 'Keikyu.LimitedExpress'),
 ('21:59:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.RapidLimitedExpress'),
 ('22:08:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('22:17:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('22:30:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('22:40:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('22:51:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('23:00:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.RapidLimitedExpress'),
 ('23:08:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.LimitedExpress'),
 ('23:16:00', 'Keikyu.Main.Sengakuji', 'Keikyu.AirportExpress'),
 ('23:32:00', 'Hokuso.Hokuso.ImbaNihonIdai', 'Keikyu.AirportExpress'),
 ('23:46:00', 'Keisei.Main.KeiseiTakasago', 'Keikyu.AirportExpress'),
 ('23:56:00', 'Keikyu.Main.Sengakuji', 'Keikyu.Local')
) as updated(departure_time, destination_station, train_type)
where station_timetable = 'Keikyu.Main.Shinagawa.Inbound.SaturdayHoliday'
  and updated.departure_time::interval = sto.departure_time 
  and updated.destination_station = sto.destination_station[1];