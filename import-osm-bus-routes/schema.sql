start transaction;

drop schema if exists osm_transit cascade;

create schema osm_transit;

create table osm_transit.line
(
    line_id              text not null
        constraint lines_pk
            primary key,
    name                 text,
    code                 text,
    colour               text,
    operator             text,
    network              text,
    mode                 text,
    frequency            text,
    opening_hours        text,
    frequency_exceptions text,
    shape                geometry
);

create table osm_transit.route
(
    route_id             text not null
        constraint route_pk
            primary key,
    name                 text,
    code                 text,
    destination          text,
    origin               text,
    colour               text,
    operator             text,
    network              text,
    mode                 text,
    frequency            text,
    opening_hours        text,
    frequency_exceptions text,
    travel_time          text,
    shape                geometry
);

create table osm_transit.line_route
(
    line_id  text not null
        constraint line_route_line_line_id_fk
            references osm_transit.line,
    route_id text not null
        constraint line_route_route_route_id_fk
            references osm_transit.route
);

create table osm_transit.stop_point
(
    stop_point_id   text    not null
        constraint stop_point_pk
            primary key,
    lat             numeric not null,
    lon             numeric not null,
    name            text,
    stop_point_type text    not null
);

create table osm_transit.stop_area
(
    stop_area_id text    not null
        constraint stop_area_pk
            primary key,
    lat          numeric not null,
    lon          numeric not null,
    name         text
);

create table osm_transit.route_point
(
    route_id text not null
        constraint route_point_route_route_id_fk
            references osm_transit.route,
    role     text not null,
    stop_id  text not null
        constraint route_point_stop_point_stop_point_id_fk
            references osm_transit.stop_point
);

commit;

abort;