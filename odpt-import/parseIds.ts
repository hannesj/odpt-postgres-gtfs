
const OPERATOR_REGEX = /^odpt\.Operator:(.*)$/;
const CALENDAR_REGEX = /^odpt\.Calendar:(.*)$/;
const BUSSTOPPOLE_REGEX = /^odpt\.BusstopPole:(.*)$/;
const BUSSROUTE_REGEX = /^odpt\.Busroute:(.*)$/;
const BUSSROUTE_PATTERN_REGEX = /^odpt\.BusroutePattern:(.*)$/;
const BUS_TIMETABLE_REGEX = /^odpt\.BusTimetable:(.*)$/;
const BUSSROUTE_PATTERN_FARE_REGEX = /^odpt\.BusroutePatternFare:(.*)$/;
const BUSSTOPPOLE_TIMETABLE_REGEX = /^odpt\.BusstopPoleTimetable:(.*)$/;
const BUS_DIRECTION_REGEX = /^odpt\.BusDirection:(.*)$/;
const STATION_REGEX = /^odpt\.Station:(.*)$/;
const RAIL_DIRECTION_REGEX = /^odpt\.RailDirection:(.*)$/;
const TRAIN_TYPE_REGEX = /^odpt\.TrainType:(.*)$/;
const RAILWAY_REGEX = /^odpt\.Railway:(.*)$/;
const TRAIN_TIMETABLE_REGEX = /^odpt\.TrainTimetable:(.*)$/;
const PASSENGER_SURVEY_REGEX = /^odpt\.PassengerSurvey:(.*)$/;
const RAILWAY_FARE_REGEX = /^odpt\.RailwayFare:(.*)$/;
const STATION_TIMETABLE_REGEX = /^odpt\.StationTimetable:(.*)$/;
const TRAIN_REGEX = /^odpt\.Train:(.*)$/;
const AIRPORT_REGEX = /^odpt\.Airport:(.*)$/;
const AIRPORT_TERMINAL_REGEX = /^odpt\.AirportTerminal:(.*)$/;
const FLIGHT_SCHEDULE_REGEX = /^odpt\.FlightSchedule:(.*)$/;
const FLIGHT_STATUS_REGEX = /^odpt\.FlightStatus:(.*)$/;

export function getOperatorId(input: string): string {
  const res = input.match(OPERATOR_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for operator: " + input);
  }
  return res[1];
}

export function getCalendarId(input: string): string {
  const res = input.match(CALENDAR_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for calendar: " + input);
  }
  return res[1];
}

export function getBusstopPoleId(input: string): string {
  const res = input.match(BUSSTOPPOLE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for busstop pole: " + input);
  }
  return res[1];
}

export function getBusrouteId(input: string): string {
  const res = input.match(BUSSROUTE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for busroute: " + input);
  }
  return res[1];
}

export function getBusroutePatternId(input: string): string {
  const res = input.match(BUSSROUTE_PATTERN_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for busroute pattern: " + input);
  }
  return res[1];
}

export function getBusTimetableId(input: string): string {
  const res = input.match(BUS_TIMETABLE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for bus timetable: " + input);
  }
  return res[1];
}

export function getBusroutePatternFareId(input: string): string {
  const res = input.match(BUSSROUTE_PATTERN_FARE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for busroute pattern fare: " + input);
  }
  return res[1];
}

export function getBusstopPoleTimetableId(input: string): string {
  const res = input.match(BUSSTOPPOLE_TIMETABLE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for busstop pole timetable: " + input);
  }
  return res[1];
}

export function getBusDirectionId(input: string): string {
  const res = input.match(BUS_DIRECTION_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for bus direction: " + input);
  }
  return res[1];
}

export function getStationId(input: string): string {
  const res = input.match(STATION_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for station: " + input);
  }
  return res[1];
}

export function getRailDirectionId(input: string): string {
  const res = input.match(RAIL_DIRECTION_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for rail direction: " + input);
  }
  return res[1];
}

export function getTrainTypeId(input: string): string {
  const res = input.match(TRAIN_TYPE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for train type: " + input);
  }
  return res[1];
}

export function getRailwayId(input: string): string {
  const res = input.match(RAILWAY_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for railway: " + input);
  }
  return res[1];
}

export function getTrainTimetableId(input: string): string {
  const res = input.match(TRAIN_TIMETABLE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for train timetable: " + input);
  }
  return res[1];
}

export function getPassengerSurveyId(input: string): string {
  const res = input.match(PASSENGER_SURVEY_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for passenger survey: " + input);
  }
  return res[1];
}

export function getRailwayFareId(input: string): string {
  const res = input.match(RAILWAY_FARE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for railway fare: " + input);
  }
  return res[1];
}

export function getStationTimetableId(input: string): string {
  const res = input.match(STATION_TIMETABLE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for station timetable: " + input);
  }
  return res[1];
}

export function getTrainId(input: string): string {
  const res = input.match(TRAIN_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for train: " + input);
  }
  return res[1];
}

export function getAirportId(input: string): string {
  const res = input.match(AIRPORT_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for airport: " + input);
  }
  return res[1];
}

export function getAirportTerminalId(input: string): string {
  const res = input.match(AIRPORT_TERMINAL_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for airport terminal: " + input);
  }
  return res[1];
}

export function getFlightScheduleId(input: string): string {
  const res = input.match(FLIGHT_SCHEDULE_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for flight schedule: " + input);
  }
  return res[1];
}

export function getFlightStatusId(input: string): string {
  const res = input.match(FLIGHT_STATUS_REGEX);
  if (res == null || res.length < 2) {
    throw new Error("Unexpected format for flight status: " + input);
  }
  return res[1];
}
