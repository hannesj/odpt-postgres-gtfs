
CREATE SCHEMA odpt;
CREATE TABLE odpt.operator (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL
);
CREATE TABLE odpt.calendar (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone,
  title text,
  translations hstore,
  operator text REFERENCES odpt.operator,
  dates date [],
  duration daterange,
  note text
);
CREATE TABLE odpt.airport (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL
);
CREATE TABLE odpt.airport_terminal (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL,
  airport text NOT NULL REFERENCES odpt.airport
);
CREATE TABLE odpt.busstop_pole (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  kana text,
  translations hstore,
  location geography(point, 4326),
  operator text NOT NULL REFERENCES odpt.operator,
  busstop_pole_number text,
  note text
);
CREATE TABLE odpt.busroute (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  short_name text,
  long_name text,
  operator text NOT NULL REFERENCES odpt.operator
);
CREATE TABLE odpt.busroute_pattern (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  kana text,
  pattern text not null,
  busroute text not null REFERENCES odpt.busroute,
  operator text NOT NULL REFERENCES odpt.operator,
  direction text,
  region geography(linestring, 4326),
  note text
);
CREATE TABLE odpt.busstop_pole_order (
  busroute_pattern text NOT NULL REFERENCES odpt.busroute_pattern,
  i smallint,
  busstop_pole text NOT NULL REFERENCES odpt.busstop_pole,
  note text,
  PRIMARY KEY (busroute_pattern, i)
);
CREATE TABLE odpt.bus_timetable (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  calendar text NOT NULL REFERENCES odpt.calendar,
  operator text NOT NULL REFERENCES odpt.operator,
  busroute_pattern text NOT NULL REFERENCES odpt.busroute_pattern,
  note text
);
CREATE TABLE odpt.bus_timetable_object (
  bus_timetable text NOT NULL REFERENCES odpt.bus_timetable,
  i smallint,
  busstop_pole text NOT NULL REFERENCES odpt.busstop_pole,
  arrival_time interval hour to second,
  departure_time interval hour to second,
  is_midnight boolean,
  is_non_step_bus boolean,
  can_get_on boolean,
  can_get_off boolean,
  destination_sign text,
  note text,
  PRIMARY KEY (bus_timetable, i)
  /* TODO bus_timetable text REFERENCES odpt.bus_timetable */
);
CREATE TABLE odpt.busroute_pattern_fare (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  operator text NOT NULL REFERENCES odpt.operator,
  ic_card_fare integer,
  ticket_fare integer not null,
  child_ic_card_fare integer,
  child_ticket_fare integer,
  from_busstop_pole text not null references odpt.busstop_pole,
  to_busstop_pole text not null references odpt.busstop_pole,
  from_busroute_pattern text not null references odpt.busroute_pattern,
  to_busroute_pattern text not null references odpt.busroute_pattern,
  from_busstop_pole_order smallint not null,
  to_busstop_pole_order smallint not null,
  note text
);
CREATE TABLE odpt.busstop_pole_timetable (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  busroute text [] NOT NULL
  /* TODO REFERENCES odpt.busroute */
,
  calendar text NOT NULL REFERENCES odpt.calendar,
  operator text NOT NULL REFERENCES odpt.operator,
  busstop_pole text NOT NULL REFERENCES odpt.busstop_pole,
  bus_direction text [] NOT NULL
  /* TODO REFERENCES odpt.bus_direction */
,
  note text
);
CREATE TABLE odpt.busstop_pole_timetable_object (
  busstop_pole_timetable text NOT NULL REFERENCES odpt.busstop_pole_timetable,
  busroute_pattern text REFERENCES odpt.busroute_pattern,
  destination_sign text,
  destination_busstop_pole text references odpt.busstop_pole,
  departure_time interval hour to second NOT NULL,
  is_midnight boolean,
  is_non_step_bus boolean,
  busroute_pattern_order smallint,
  note text
  /* TODO bus_timetable text REFERENCES odpt.bus_timetable */
  /* TODO FOREIGN KEY odpt.bus_timetable_object */
);
CREATE TABLE odpt.flight_schedule (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  calendar text NOT NULL REFERENCES odpt.calendar,
  operator text NOT NULL REFERENCES odpt.operator,
  origin_airport text NOT NULL REFERENCES odpt.airport,
  destination_airport text NOT NULL REFERENCES odpt.airport
);
CREATE TABLE odpt.flight_schedule_object (
  flight_schedule text NOT NULL REFERENCES odpt.flight_schedule,
  airline text NOT NULL REFERENCES odpt.operator,
  is_valid_to date NOT NULL,
  is_valid_from date NOT NULL,
  origin_time time with time zone,
  destination_time time with time zone,
  flight_number text [] NOT NULL,
  aircraft_type text,
  origin_day_difference smallint,
  destination_day_difference smallint,
  via_airport text []
  /* TODO REFERENCES odpt.airport */
,
  note hstore
);
CREATE TABLE odpt.flight_status (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL
);
CREATE TABLE odpt.passenger_survey (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  operator text NOT NULL REFERENCES odpt.operator,
  railway text [] NOT NULL
  /* TODO REFERENCES odpt.railway */
,
  station text [] NOT NULL
  /* TODO REFERENCES odpt.station */
,
  include_alighting boolean NOT NULL,
  passenger_survey_object jsonb NOT NULL
);
CREATE TABLE odpt.rail_direction (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL,
  operator text REFERENCES odpt.operator
);
CREATE TABLE odpt.train_type (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL,
  operator text REFERENCES odpt.operator
);
CREATE TABLE odpt.railway (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL,
  operator text NOT NULL REFERENCES odpt.operator,
  color char(6),
  line_code text,
  ascending_rail_direction text REFERENCES odpt.rail_direction,
  descending_rail_direction text REFERENCES odpt.rail_direction
);
CREATE TABLE odpt.station (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  title text NOT NULL,
  translations hstore NOT NULL,
  location geography(point, 4326),
  operator text NOT NULL REFERENCES odpt.operator,
  railway text NOT NULL REFERENCES odpt.railway,
  connecting_railway text []
  /* REFERENCES odpt.railway */
,
  station_code text
);
CREATE TABLE odpt.station_order (
  railway text NOT NULL REFERENCES odpt.railway,
  i smallint,
  station text NOT NULL REFERENCES odpt.station,
  station_title hstore NOT NULL,
  PRIMARY KEY (railway, i)
);
CREATE TABLE odpt.railway_fare (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  issued timestamp with time zone NOT NULL,
  operator text NOT NULL REFERENCES odpt.operator,
  ic_card_fare integer not null,
  ticket_fare integer not null,
  child_ic_card_fare integer not null,
  child_ticket_fare integer not null,
  from_station text not null references odpt.station,
  to_station text not null references odpt.station,
  via_station text []
  /* TODO references odpt.station */
,
  via_railway text []
  /* TODO references odpt.railway */
);
CREATE TABLE odpt.station_timetable (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  issued timestamp with time zone NOT NULL,
  railway text NOT NULL REFERENCES odpt.railway,
  station text NOT NULL REFERENCES odpt.station,
  calendar text NOT NULL REFERENCES odpt.calendar,
  operator text NOT NULL REFERENCES odpt.operator,
  rail_direction text NOT NULL REFERENCES odpt.rail_direction
);
CREATE TABLE odpt.station_timetable_object (
  station_timetable text NOT NULL REFERENCES odpt.station_timetable,
  train text
  /* REFERENCES odpt.train */
,
  train_type text NOT NULL REFERENCES odpt.train_type,
  train_number text,
  departure_time interval hour to second NOT NULL,
  destination_station text []
  /* references odpt.station */
,
  is_last boolean,
  is_origin boolean,
  train_name hstore [],
  platform_number text,
  via_railway text []
  /* references odpt.railway */
,
  note hstore
  /* TODO train_timetable text REFERENCES odpt.train_timetable */
  /* TODO FOREIGN KEY odpt.train_timetable_object */
);
CREATE TABLE odpt.train_timetable (
  id text NOT NULL PRIMARY KEY,
  modified_at timestamp with time zone NOT NULL,
  issued timestamp with time zone NOT NULL,
  train text NOT NULL
  /* REFERENCES odpt.train */
,
  railway text NOT NULL REFERENCES odpt.railway,
  calendar text NOT NULL REFERENCES odpt.calendar,
  operator text NOT NULL REFERENCES odpt.operator,
  train_type text NOT NULL REFERENCES odpt.train_type,
  train_number text NOT NULL,
  rail_direction text NOT NULL REFERENCES odpt.rail_direction,
  origin_station text []
  /* references odpt.station */
,
  destination_station text []
  /* references odpt.station */
,
  previous_train_timetable text []
  /* references odpt.train_timetable */
,
  next_train_timetable text []
  /* references odpt.train_timetable */
,
  via_railway text []
  /* references odpt.railway */
);
CREATE TABLE odpt.train_timetable_object (
  train_timetable text NOT NULL REFERENCES odpt.train_timetable,
  i smallint,
  arrival_time interval hour to second,
  departure_time interval hour to second,
  arrival_station text REFERENCES odpt.station,
  departure_station text REFERENCES odpt.station,
  platform_number text,
  PRIMARY KEY (train_timetable, i)
  /* TODO station_timetable_object text REFERENCES odpt.station_timetable_object */
);

create view odpt.train_timetable_min_index as
select id, min(i) as i
from odpt.train_timetable_object tto
inner join odpt.train_timetable tt on tto.train_timetable = tt.id
group by tt.id;

create view odpt.train_timetable_max_index as
select id, max(i) as i
from odpt.train_timetable_object tto
inner join odpt.train_timetable tt on tto.train_timetable = tt.id
group by tt.id;