import { Client, Transaction } from "https://deno.land/x/postgres@v0.13.0/mod.ts";
import { streamingFileParser as streamingParser } from "./jsonStream.ts";
import { Convert, OdptNote, OdptTitle, Titile } from "./odpt.ts";
import {
  getOperatorId,
  getCalendarId,
  getAirportId,
  getAirportTerminalId,
  getFlightScheduleId,
  getFlightStatusId,
  getBusstopPoleId,
  getBusrouteId,
  getBusroutePatternId,
  getBusTimetableId,
  getBusroutePatternFareId,
  getBusstopPoleTimetableId,
  getBusDirectionId,
  getPassengerSurveyId,
  getRailwayId,
  getStationId,
  getRailDirectionId,
  getTrainTypeId,
  getRailwayFareId,
  getStationTimetableId,
  getTrainId,
  getTrainTimetableId,
} from "./parseIds.ts";

function toHstore(o: OdptTitle | OdptNote | Titile ): string {
  return Object.entries(o)
    .map(([k, v]) => (v != null ? `${k}=>"${v}"` : null))
    .filter((v) => v != null)
    .join(",");
}

async function importOperators(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Operator.json`)) {
    const operator = Convert.toOperator(s);
    const id = getOperatorId(operator.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.operator 
        (id, modified_at, title, translations) 
      VALUES 
        ( ${id},
          ${operator.dcDate},
          ${operator.dcTitle},
          ${toHstore(operator.odptOperatorTitle)}
        )`;
  }
}

async function importCalendars(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Calendar.json`)) {
    const obj = Convert.toCalendar(s);
    const id = getCalendarId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.calendar 
        (id, modified_at, title, translations, operator, dates, duration, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${obj.odptCalendarTitle ? toHstore(obj.odptCalendarTitle) : null},
          ${obj.odptOperator ? getOperatorId(obj.odptOperator) : null},
          ${
            obj.odptDay
              ? `{${obj.odptDay
                  .map((d) => d.toISOString().substr(0, 10))
                  .join(",")}}`
              : null
          },
          ${
            obj.odptDuration ? `[${obj.odptDuration.replace("/", ",")}]` : null
          },
          ${obj.odptNote}
        )`;
  }
}

async function importAirports(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Airport.json`)) {
    const obj = Convert.toAirport(s);
    const id = getAirportId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.airport 
        (id, modified_at, title, translations) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptAirportTitle)}
        )`;
  }
}

async function importAirportTerminals(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/AirportTerminal.json`)) {
    const obj = Convert.toAirportTerminal(s);
    const id = getAirportTerminalId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.airport_terminal
        (id, modified_at, title, translations, airport) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptAirportTerminalTitle)},
          ${getAirportId(obj.odptAirport)}
        )`;
  }
}

async function importBusstopPoles(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/BusstopPole.json`)) {
    const obj = Convert.toBusstopPole(s);
    const id = getBusstopPoleId(obj.owlSameAs);
    if (obj.odptOperator.length !== 1) {
      throw new Error("Unexpected number of operators for busstop pole: " + id);
    }
    const title = obj.title ?? obj.titile;
    await transaction.queryArray`
      INSERT INTO odpt.busstop_pole
        (id, modified_at, title, kana, translations, location, operator, busstop_pole_number, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${obj.odptKana},
          ${title ? toHstore(title) : null},
          ${
            obj.geoLat && obj.geoLong
              ? `POINT(${obj.geoLong} ${obj.geoLat})`
              : null
          },
          ${getOperatorId(obj.odptOperator[0])},
          ${obj.odptBusstopPoleNumber},
          ${obj.odptNote}
        )`;
  }
}

async function importBusroutePatterns(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/BusroutePattern.json`)) {
    const obj = Convert.toBusroutePattern(s);
    const id = getBusroutePatternId(obj.owlSameAs);
    if (obj.ugRegion && obj.ugRegion.type !== "LineString") {
      throw new Error("Unexpected region for bussroute pattern: " + id);
    }

    await transaction.queryArray`
      INSERT INTO odpt.busroute 
        (id, modified_at, operator) 
      VALUES 
        ( ${getBusrouteId(obj.odptBusroute)},
          ${obj.dcDate},
          ${getOperatorId(obj.odptOperator)}
        ) ON CONFLICT (id) DO NOTHING`;

    await transaction.queryArray`
      INSERT INTO odpt.busroute_pattern 
        (id, modified_at, title, kana, pattern, busroute, operator, direction, region, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${obj.odptKana},
          ${obj.odptPattern},
          ${getBusrouteId(obj.odptBusroute)},
          ${getOperatorId(obj.odptOperator)},
          ${obj.odptDirection},
          ST_GeomFromGeoJSON(${
            obj.ugRegion ? JSON.stringify(obj.ugRegion) : null
          }),
          ${obj.odptNote}
        )`;

    for (const order of obj.odptBusstopPoleOrder) {
      await transaction.queryArray`
      INSERT INTO odpt.busstop_pole_order 
        (busroute_pattern, i, busstop_pole, note) 
      VALUES 
        ( ${id},
          ${order.odptIndex},
          ${getBusstopPoleId(order.odptBusstopPole)},
          ${order.odptNote}
        ) ON CONFLICT (busroute_pattern, i) DO NOTHING`;
    }
  }
}

async function importBusTimetables(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/BusTimetable.json`)) {
    const obj = Convert.toBusTimetable(s);
    const id = getBusTimetableId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.bus_timetable 
        (id, modified_at, title, calendar, operator, busroute_pattern, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${getCalendarId(obj.odptCalendar)},
          ${getOperatorId(obj.odptOperator)},
          ${getBusroutePatternId(obj.odptBusroutePattern)},
          ${obj.odptNote}
        )`;

    for (const order of obj.odptBusTimetableObject) {
      await transaction.queryArray`
      INSERT INTO odpt.bus_timetable_object 
        (bus_timetable, i, busstop_pole, arrival_time, departure_time, is_midnight, is_non_step_bus, can_get_on, can_get_off, destination_sign, note) 
      VALUES 
        ( ${id},
          ${order.odptIndex},
          ${getBusstopPoleId(order.odptBusstopPole)},
          ${order.odptArrivalTime},
          ${order.odptDepartureTime},
          ${order.odptIsMidnight},
          ${order.odptIsNonStepBus},
          ${order.odptCanGetOn},
          ${order.odptCanGetOff},
          ${order.odptDestinationSign},
          ${order.odptNote}
        )`;
    }
  }
}

async function importBusroutePatternFares(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(
    `data/${feed}/BusroutePatternFare.json`
  )) {
    const obj = Convert.toBusroutePatternFare(s);
    const id = getBusroutePatternFareId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.busroute_pattern_fare 
        (id, modified_at, operator, ic_card_fare, ticket_fare, 
          child_ic_card_fare, child_ticket_fare,
          from_busstop_pole, to_busstop_pole, from_busroute_pattern, to_busroute_pattern,
          from_busstop_pole_order, to_busstop_pole_order, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${getOperatorId(obj.odptOperator)},
          ${obj.odptICCardFare},
          ${obj.odptTicketFare},
          ${obj.odptChildICCardFare},
          ${obj.odptChildTicketFare},
          ${getBusstopPoleId(obj.odptFromBusstopPole)},
          ${getBusstopPoleId(obj.odptToBusstopPole)},
          ${getBusroutePatternId(obj.odptFromBusroutePattern)},
          ${getBusroutePatternId(obj.odptToBusroutePattern)},
          ${obj.odptFromBusstopPoleOrder},
          ${obj.odptToBusstopPoleOrder},
          ${obj.odptNote}
        )`;
  }
}

async function importBusstopPoleTimetables(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(
    `data/${feed}/BusstopPoleTimetable.json`
  )) {
    const obj = Convert.toBusstopPoleTimetable(s);
    const id = getBusstopPoleTimetableId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.busstop_pole_timetable 
        (id, modified_at, title, busroute, calendar, operator, busstop_pole, bus_direction, note) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${
            Array.isArray(obj.odptBusroute)
              ? `{'${obj.odptBusroute.map(getBusrouteId).join("','")}'}`
              : `{'${getBusrouteId(obj.odptBusroute)}'}`
          },
          ${getCalendarId(obj.odptCalendar)},
          ${getOperatorId(obj.odptOperator)},
          ${getBusstopPoleId(obj.odptBusstopPole)},
          ${
            Array.isArray(obj.odptBusDirection)
              ? `{'${obj.odptBusDirection.map(getBusDirectionId).join("','")}'}`
              : `{'${getBusDirectionId(obj.odptBusDirection)}'}`
          },
          ${obj.odptNote}
        )`;

    for (const order of obj.odptBusstopPoleTimetableObject) {
      await transaction.queryArray`
      INSERT INTO odpt.busstop_pole_timetable_object 
        (busstop_pole_timetable, busroute_pattern, destination_sign, destination_busstop_pole, departure_time, is_midnight, is_non_step_bus, busroute_pattern_order, note) 
      VALUES 
        ( ${id},
          ${
            order.odptBusroutePattern
              ? getBusroutePatternId(order.odptBusroutePattern)
              : null
          },
          ${order.odptDestinationSign},
          ${
            order.odptDestinationBusstopPole
              ? getBusstopPoleId(order.odptDestinationBusstopPole)
              : null
          },
          ${order.odptDepartureTime},
          ${order.odptIsMidnight},
          ${order.odptIsNonStepBus},
          ${order.odptBusroutePatternOrder},
          ${order.odptNote}
        )`;
    }
  }
}

async function importFlightSchedules(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/FlightSchedule.json`)) {
    const obj = Convert.toFlightSchedule(s);
    const id = getFlightScheduleId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.flight_schedule 
        (id, modified_at, calendar, operator, origin_airport, destination_airport) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${getCalendarId(obj.odptCalendar)},
          ${getOperatorId(obj.odptOperator)},
          ${getAirportId(obj.odptOriginAirport)},
          ${getAirportId(obj.odptDestinationAirport)}
        )`;

    for (const order of obj.odptFlightScheduleObject) {
      await transaction.queryArray`
      INSERT INTO odpt.flight_schedule_object 
        ( flight_schedule, airline, is_valid_to, is_valid_from, origin_time, destination_time,
          flight_number, aircraft_type, origin_day_difference, destination_day_difference,
          via_airport, note) 
      VALUES 
        ( ${id},
          ${getOperatorId(order.odptAirline)},
          ${order.odptIsValidTo},
          ${order.odptIsValidFrom},
          ${order.odptOriginTime},
          ${order.odptDestinationTime},
          ${order.odptFlightNumber},
          ${order.odptAircraftType},
          ${order.odptOriginDayDifference},
          ${order.odptDestinationDayDifference},
          ${order.odptViaAirport?.map(getAirportId) ?? null},
          ${order.odptNote ? toHstore(order.odptNote) : null}
        )`;
    }
  }
}

async function importFlightStatus(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/FlightStatus.json`)) {
    const obj = Convert.toFlightStatus(s);
    const id = getFlightStatusId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.flight_status 
        (id, modified_at, title, translations) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptFlightStatusTitle)}
        )`;
  }
}

async function importPassengerSurveys(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/PassengerSurvey.json`)) {
    const obj = Convert.toPassengerSurvey(s);
    const id = getPassengerSurveyId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.passenger_survey 
        (id, modified_at, operator, railway, station, include_alighting, passenger_survey_object) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${getOperatorId(obj.odptOperator)},
          ${obj.odptRailway.map(getRailwayId)},
          ${obj.odptStation.map(getStationId)},
          ${obj.odptIncludeAlighting},
          ${JSON.stringify(obj.odptPassengerSurveyObject)}
        )`;
  }
}

async function importRailDirections(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/RailDirection.json`)) {
    const obj = Convert.toRailDirection(s);
    const id = getRailDirectionId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.rail_direction 
        (id, modified_at, title, translations, operator) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptRailDirectionTitle)},
          ${obj.odptOperator ? getOperatorId(obj.odptOperator) : null}
        )`;
  }
}

async function importTrainTypes(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/TrainType.json`)) {
    const obj = Convert.toTrainType(s);
    const id = getTrainTypeId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.train_type 
        (id, modified_at, title, translations, operator) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptTrainTypeTitle)},
          ${getOperatorId(obj.odptOperator)}
        )`;
  }
}

async function importRailways(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Railway.json`)) {
    const obj = Convert.toRailway(s);
    const id = getRailwayId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.railway 
        (id, modified_at, title, translations, operator, color, line_code, ascending_rail_direction, descending_rail_direction) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptRailwayTitle)},
          ${getOperatorId(obj.odptOperator)},
          ${obj.odptColor?.replace("#", "")},
          ${obj.odptLineCode},
          ${
            obj.odptAscendingRailDirection
              ? getRailDirectionId(obj.odptAscendingRailDirection)
              : null
          },
          ${
            obj.odptDescendingRailDirection
              ? getRailDirectionId(obj.odptDescendingRailDirection)
              : null
          }
        )`;
  }
}

async function importStations(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Station.json`)) {
    const obj = Convert.toStation(s);
    const id = getStationId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.station 
        (id, modified_at, title, translations, location, operator, railway, connecting_railway, station_code) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dcTitle},
          ${toHstore(obj.odptStationTitle)},
          ${
            obj.geoLat && obj.geoLong
              ? `POINT(${obj.geoLong} ${obj.geoLat})`
              : null
          },
          ${getOperatorId(obj.odptOperator)},
          ${getRailwayId(obj.odptRailway)},
          ${obj.odptConnectingRailway?.map(getRailwayId)},
          ${obj.odptStationCode}
        )`;
  }
}

async function importStationOrders(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/Railway.json`)) {
    const obj = Convert.toRailway(s);
    const id = getRailwayId(obj.owlSameAs);

    for (const order of obj.odptStationOrder) {
      await transaction.queryArray`
      INSERT INTO odpt.station_order 
        (railway, i, station, station_title) 
      VALUES 
        ( ${id},
          ${order.odptIndex},
          ${getStationId(order.odptStation)},
          ${toHstore(order.odptStationTitle)}
        )`;
    }
  }
}

async function importRailwayFares(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/RailwayFare.json`)) {
    const obj = Convert.toRailwayFare(s);
    const id = getRailwayFareId(obj.owlSameAs);
    await transaction.queryArray`
      INSERT INTO odpt.railway_fare 
        (id, modified_at, issued, operator, ic_card_fare, ticket_fare, 
          child_ic_card_fare, child_ticket_fare,
          from_station, to_station, via_station, via_railway)
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dctIssued},
          ${getOperatorId(obj.odptOperator)},
          ${obj.odptICCardFare},
          ${obj.odptTicketFare},
          ${obj.odptChildICCardFare},
          ${obj.odptChildTicketFare},
          ${getStationId(obj.odptFromStation)},
          ${getStationId(obj.odptToStation)},
          ${obj.odptViaStation?.map(getStationId)},
          ${obj.odptViaRailway?.map(getRailwayId)}
        )`;
  }
}

async function importStationTimetables(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/StationTimetable.json`)) {
    const obj = Convert.toStationTimetable(s);
    const id = getStationTimetableId(obj.owlSameAs);

    let station = getStationId(obj.odptStation);

    if (station === "Tokyu.Oimachi.Takatsu") {
      station = "Tokyu.DenEnToshi.Takatsu";
    } else if (station === "Tokyu.Oimachi.FutakoShinchi") {
      station = "Tokyu.DenEnToshi.FutakoShinchi";
    }

    await transaction.queryArray`
      INSERT INTO odpt.station_timetable 
        (id, modified_at, issued, railway, station, calendar, operator, rail_direction) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dctIssued},
          ${getRailwayId(obj.odptRailway)},
          ${station},
          ${getCalendarId(obj.odptCalendar)},
          ${getOperatorId(obj.odptOperator)},
          ${getRailDirectionId(obj.odptRailDirection)}
        )`;

    for (const order of obj.odptStationTimetableObject) {
      await transaction.queryArray`
      INSERT INTO odpt.station_timetable_object 
        (station_timetable, train, train_type, train_number, departure_time, 
          destination_station, is_last, is_origin, train_name, platform_number, 
          via_railway, note) 
      VALUES 
        ( ${id},
          ${order.odptTrain ? getTrainId(order.odptTrain) : null},
          ${getTrainTypeId(order.odptTrainType)},
          ${order.odptTrainNumber},
          ${order.odptDepartureTime},
          ${order.odptDestinationStation?.map(getStationId)},
          ${order.odptIsLast},
          ${order.odptIsOrigin},
          ${order.odptTrainName ? order.odptTrainName.map(toHstore) : null},
          ${order.odptPlatformNumber},
          ${order.odptViaRailway?.map(getRailwayId)},
          ${order.odptNote ? toHstore(order.odptNote) : null}
        )`;
    }
  }
}

async function importTrainTimetables(feed: string, transaction: Transaction) {
  for await (const s of streamingParser(`data/${feed}/TrainTimetable.json`)) {
    const obj = Convert.toTrainTimetable(s);
    const id = getTrainTimetableId(obj.owlSameAs);

    await transaction.queryArray`
      INSERT INTO odpt.train_timetable 
        (id, modified_at, issued, train, railway, calendar, operator, 
          train_type, train_number, rail_direction, origin_station, destination_station,
          previous_train_timetable, next_train_timetable, via_railway) 
      VALUES 
        ( ${id},
          ${obj.dcDate},
          ${obj.dctIssued},
          ${getTrainId(obj.odptTrain)},
          ${getRailwayId(obj.odptRailway)},
          ${getCalendarId(obj.odptCalendar)},
          ${getOperatorId(obj.odptOperator)},
          ${getTrainTypeId(obj.odptTrainType)},
          ${obj.odptTrainNumber},
          ${getRailDirectionId(obj.odptRailDirection)},
          ${obj.odptOriginStation?.map(getStationId)},
          ${obj.odptDestinationStation?.map(getStationId)},
          ${obj.odptPreviousTrainTimetable?.map(getTrainTimetableId)},
          ${obj.odptNextTrainTimetable?.map(getTrainTimetableId)},
          ${obj.odptViaRailway?.map(getRailwayId)}
        )`;

    for (const [i, order] of obj.odptTrainTimetableObject.entries()) {
      await transaction.queryArray`
      INSERT INTO odpt.train_timetable_object 
        (train_timetable, i, arrival_time, departure_time, arrival_station, departure_station, platform_number) 
      VALUES 
        ( ${id},
          ${i},
          ${order.odptArrivalTime},
          ${order.odptDepartureTime},
          ${
            order.odptArrivalStation
              ? getStationId(order.odptArrivalStation)
              : null
          },
          ${
            order.odptDepartureStation
              ? getStationId(order.odptDepartureStation)
              : null
          },
          ${order.odptPlatformNumber}
        )`;
    }
  }
}

const feed = "2021-10-16T20:29:56.063Z" //Deno.env.get("ODPT_DATA_VERSION");

if (!feed) {
  throw new Error("ODPT_DATA_VERSION is not defined");
}

console.log(`Importing ${feed}`)

const client = new Client({
  user: "hannes",
  database: "postgres",
  hostname: "localhost",
  port: 5432,
});
await client.connect();

const transaction = client.createTransaction("import");

await transaction.begin();

try {
  const oldSchema = await transaction.queryArray("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'odpt';")
  if (oldSchema.rows.length > 0) {
    await transaction.queryArray(`ALTER SCHEMA odpt RENAME TO "odpt_backup_${new Date().toISOString()}";`)
  }
  const schema = await Deno.readFile("./odpt-import/schema.sql")
  await transaction.queryArray(new TextDecoder().decode(schema))

  await importOperators(feed, transaction);
  await importCalendars(feed, transaction);
  await importAirports(feed, transaction);
  await importAirportTerminals(feed, transaction);
  await importBusstopPoles(feed, transaction);
  await importBusroutePatterns(feed, transaction);
  await importBusTimetables(feed, transaction);
  await importBusroutePatternFares(feed, transaction);
  await importBusstopPoleTimetables(feed, transaction);
  await importFlightSchedules(feed, transaction);
  await importFlightStatus(feed, transaction);
  await importPassengerSurveys(feed, transaction);
  await importRailDirections(feed, transaction);
  await importTrainTypes(feed, transaction);
  await importRailways(feed, transaction);
  await importStations(feed, transaction);
  await importStationOrders(feed, transaction);
  await importRailwayFares(feed, transaction);
  await importStationTimetables(feed, transaction);
  await importTrainTimetables(feed, transaction);

  await transaction.commit();
} catch (e) {
  console.error(e);
  console.error(e.cause);
  await transaction.rollback();
}
