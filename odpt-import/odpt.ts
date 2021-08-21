// To parse this data:
//
//   import { Convert } from "./file";
//
//   const airport = Convert.toAirport(json);
//   const airportTerminal = Convert.toAirportTerminal(json);
//   const busTimetable = Convert.toBusTimetable(json);
//   const busroutePattern = Convert.toBusroutePattern(json);
//   const busroutePatternFare = Convert.toBusroutePatternFare(json);
//   const busstopPole = Convert.toBusstopPole(json);
//   const busstopPoleTimetable = Convert.toBusstopPoleTimetable(json);
//   const calendar = Convert.toCalendar(json);
//   const flightSchedule = Convert.toFlightSchedule(json);
//   const flightStatus = Convert.toFlightStatus(json);
//   const operator = Convert.toOperator(json);
//   const passengerSurvey = Convert.toPassengerSurvey(json);
//   const railDirection = Convert.toRailDirection(json);
//   const railway = Convert.toRailway(json);
//   const railwayFare = Convert.toRailwayFare(json);
//   const station = Convert.toStation(json);
//   const stationTimetable = Convert.toStationTimetable(json);
//   const trainTimetable = Convert.toTrainTimetable(json);
//   const trainType = Convert.toTrainType(json);
//   const bus = Convert.toBus(json);
//   const flightInformationArrivalJSON = Convert.toFlightInformationArrivalJSON(json);
//   const flightInformationDeparture = Convert.toFlightInformationDeparture(json);
//   const train = Convert.toTrain(json);
//   const trainInformation = Convert.toTrainInformation(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Airport {
    id:                   string;
    type:                 string;
    dcDate:               Date;
    context:              string;
    dcTitle:              string;
    owlSameAs:            string;
    odptAirportTitle:     OdptTitle;
    odptAirportTerminal?: string[];
}

export interface AirportTerminal {
    id:                       string;
    type:                     string;
    dcDate:                   Date;
    context:                  string;
    dcTitle:                  string;
    owlSameAs:                string;
    odptAirport:              string;
    odptAirportTerminalTitle: OdptTitle;
}

export interface BusTimetable {
    id:                     string;
    type:                   string;
    dcDate:                 Date;
    context:                string;
    dcTitle:                string;
    odptNote?:              string;
    owlSameAs:              string;
    odptCalendar:           string;
    odptOperator:           string;
    odptBusroutePattern:    string;
    odptBusTimetableObject: OdptBusTimetableObject[];
}

export interface OdptBusTimetableObject {
    odptNote?:            string;
    odptIndex:            number;
    odptCanGetOn?:        boolean;
    odptCanGetOff?:       boolean;
    odptIsMidnight?:      boolean;
    odptArrivalTime?:     null | string;
    odptBusstopPole:      string;
    odptIsNonStepBus?:    boolean | null;
    odptDepartureTime?:   null | string;
    odptDestinationSign?: null | string;
}

export interface BusroutePattern {
    id:                   string;
    type:                 string;
    dcDate:               Date;
    context:              string;
    dcTitle:              string;
    odptKana?:            null;
    odptNote?:            string;
    ugRegion:             UgRegion | null;
    owlSameAs:            string;
    odptPattern:          string;
    odptBusroute:         string;
    odptOperator:         string;
    odptDirection?:       null | string;
    odptBusstopPoleOrder: OdptBusstopPoleOrder[];
}

export interface OdptBusstopPoleOrder {
    odptNote?:       string;
    odptIndex:       number;
    odptBusstopPole: string;
}

export interface UgRegion {
    type:        string;
    coordinates: Array<number[]>;
}

export interface BusroutePatternFare {
    id:                       string;
    type:                     string;
    dcDate:                   Date;
    context:                  string;
    odptNote?:                string;
    owlSameAs:                string;
    odptOperator:             string;
    odptICCardFare?:          number;
    odptTicketFare:           number;
    odptToBusstopPole:        string;
    odptChildICCardFare?:     number;
    odptChildTicketFare?:     number;
    odptFromBusstopPole:      string;
    odptToBusroutePattern:    string;
    odptToBusstopPoleOrder:   number;
    odptFromBusroutePattern:  string;
    odptFromBusstopPoleOrder: number;
}

export interface BusstopPole {
    id:                        string;
    type:                      string;
    dcDate:                    Date;
    geoLat:                    number | null;
    context:                   string;
    dcTitle:                   string;
    geoLong:                   number | null;
    odptKana?:                 null | string;
    ugRegion?:                 null;
    owlSameAs:                 string;
    odptOperator:              string[];
    odptBusroutePattern:       string[];
    odptNote?:                 string;
    odptBusstopPoleNumber?:    null | string;
    odptBusstopPoleTimetable?: string[] | null;
    title?:                    Title;
    titile?:                   Titile;
}

export interface Titile {
    ja:     string;
    jaHrkt: string;
}

export interface Title {
    ja:      string;
    jaHrkt:  string;
    en?:     string;
    ko?:     null | string;
    zhHans?: null | string;
    zh?:     string;
}

export interface BusstopPoleTimetable {
    id:                             string;
    type:                           string;
    dcDate:                         Date;
    context:                        string;
    dcTitle:                        string;
    owlSameAs:                      string;
    odptBusroute:                   string[] | string;
    odptCalendar:                   string;
    odptOperator:                   string;
    odptBusstopPole:                string;
    odptBusDirection:               string[] | string;
    odptBusstopPoleTimetableObject: OdptBusstopPoleTimetableObject[];
    odptNote?:                      string;
}

export interface OdptBusstopPoleTimetableObject {
    odptNote?:                   string;
    odptIsMidnight?:             boolean;
    odptDepartureTime:           string;
    odptBusroutePattern?:        string;
    odptDestinationSign?:        string;
    odptDestinationBusstopPole?: string;
    odptIsNonStepBus?:           boolean;
    odptBusroutePatternOrder?:   number;
}

export interface Calendar {
    id:                 string;
    type:               string;
    dcDate?:            Date;
    context:            string;
    dcTitle:            null | string;
    owlSameAs:          string;
    odptCalendarTitle?: OdptTitle;
    odptOperator?:      string;
    odptDay?:           Date[];
    odptDuration?:      string;
    odptNote?:          string;
}

export interface FlightSchedule {
    id:                       string;
    type:                     string;
    dcDate:                   Date;
    context:                  string;
    owlSameAs:                string;
    odptCalendar:             string;
    odptOperator:             string;
    odptOriginAirport:        string;
    odptDestinationAirport:   string;
    odptFlightScheduleObject: OdptFlightScheduleObject[];
}

export interface OdptFlightScheduleObject {
    odptAirline:                   string;
    odptIsValidTo:                 Date;
    odptOriginTime?:               string;
    odptIsValidFrom:               Date;
    odptAircraftType?:             string;
    odptFlightNumber:              string[];
    odptDestinationTime?:          string;
    odptOriginDayDifference?:      number;
    odptDestinationDayDifference?: number;
    odptViaAirport?:               string[];
    odptNote?:                     OdptNote;
}

export interface OdptNote {
    ja: string;
}

export interface FlightStatus {
    id:                    string;
    type:                  string;
    dcDate:                Date;
    context:               string;
    dcTitle:               string;
    owlSameAs:             string;
    odptFlightStatusTitle: OdptTitle;
}

export interface Operator {
    id:                string;
    type:              string;
    dcDate:            Date;
    context:           string;
    dcTitle:           string;
    owlSameAs:         string;
    odptOperatorTitle: OdptTitle;
}

export interface PassengerSurvey {
    id:                        string;
    type:                      string;
    dcDate:                    Date;
    context:                   string;
    owlSameAs:                 string;
    odptRailway:               string[];
    odptStation:               string[];
    odptOperator:              string;
    odptIncludeAlighting:      boolean;
    odptPassengerSurveyObject: OdptPassengerSurveyObject[];
}

export interface OdptPassengerSurveyObject {
    odptSurveyYear:        number;
    odptPassengerJourneys: number;
}

export interface RailDirection {
    id:                     string;
    type:                   string;
    dcDate:                 Date;
    context:                string;
    dcTitle:                string;
    owlSameAs:              string;
    odptOperator?:          string;
    odptRailDirectionTitle: OdptTitle;
}

export interface Railway {
    id:                           string;
    type:                         string;
    dcDate:                       Date;
    context:                      string;
    dcTitle:                      string;
    owlSameAs:                    string;
    odptOperator:                 string;
    odptRailwayTitle:             OdptTitle;
    odptStationOrder:             OdptStationOrder[];
    odptColor?:                   string;
    odptLineCode?:                string;
    odptAscendingRailDirection?:  string;
    odptDescendingRailDirection?: string;
}

export interface OdptTitle {
    en:      string;
    ja:      string;
    ko?:     string;
    zhHans?: string;
    zhHant?: string;
    jaHrkt?: string;
}

export interface OdptStationOrder {
    odptIndex:        number;
    odptStation:      string;
    odptStationTitle: OdptTitle;
}

export interface RailwayFare {
    id:                  string;
    type:                string;
    dcDate:              Date;
    context:             string;
    dctIssued:           Date;
    owlSameAs:           string;
    odptOperator:        string;
    odptToStation:       string;
    odptICCardFare:      number;
    odptTicketFare:      number;
    odptFromStation:     string;
    odptChildICCardFare: number;
    odptChildTicketFare: number;
    odptViaStation?:     string[];
    odptViaRailway?:     string[];
}

export interface Station {
    id:                     string;
    type:                   string;
    dcDate:                 Date;
    context:                string;
    dcTitle:                string;
    owlSameAs:              string;
    odptRailway:            string;
    odptOperator:           string;
    odptStationTitle:       OdptTitle;
    odptConnectingRailway?: string[];
    geoLat?:                number;
    geoLong?:               number;
    odptStationCode?:       string;
    odptPassengerSurvey?:   string[];
    odptStationTimetable?:  string[];
}

export interface StationTimetable {
    id:                         string;
    type:                       string;
    dcDate:                     Date;
    context:                    string;
    dctIssued:                  Date;
    owlSameAs:                  string;
    odptRailway:                string;
    odptStation:                string;
    odptCalendar:               string;
    odptOperator:               string;
    odptRailDirection:          string;
    odptStationTimetableObject: OdptStationTimetableObject[];
}

export interface OdptStationTimetableObject {
    odptTrain?:              string;
    odptTrainType:           string;
    odptTrainNumber?:        string;
    odptDepartureTime:       string;
    odptDestinationStation?: string[];
    odptIsLast?:             boolean;
    odptIsOrigin?:           boolean;
    odptNote?:               OdptNote;
    odptTrainName?:          OdptTitle[];
    odptPlatformNumber?:     string;
    odptViaRailway?:         string[];
}

export interface TrainTimetable {
    id:                          string;
    type:                        string;
    dcDate:                      Date;
    context:                     string;
    dctIssued:                   Date;
    odptTrain:                   string;
    owlSameAs:                   string;
    odptRailway:                 string;
    odptCalendar:                string;
    odptOperator:                string;
    odptTrainType:               string;
    odptTrainNumber:             string;
    odptOriginStation?:          string[];
    odptRailDirection:           string;
    odptDestinationStation?:     string[];
    odptTrainTimetableObject:    OdptTrainTimetableObject[];
    odptPreviousTrainTimetable?: string[];
    odptNextTrainTimetable?:     string[];
    odptViaRailway?:             string[];
}

export interface OdptTrainTimetableObject {
    odptDepartureTime?:    string;
    odptDepartureStation?: string;
    odptArrivalTime?:      string;
    odptArrivalStation?:   string;
    odptPlatformNumber?:   string;
}

export interface TrainType {
    id:                 string;
    type:               string;
    dcDate:             Date;
    context:            string;
    dcTitle:            string;
    owlSameAs:          string;
    odptOperator:       string;
    odptTrainTypeTitle: OdptTitle;
}

export interface Bus {
    id:                       null | string;
    type:                     string;
    dcDate:                   Date;
    geoLat?:                  number;
    context:                  string;
    geoLong?:                 number;
    dctValid:                 Date;
    owlSameAs:                string;
    odptAzimuth?:             number;
    odptBusroute:             string;
    odptOperator:             string;
    odptBusNumber:            string;
    odptFrequency:            number;
    odptBusTimetable?:        null | string;
    odptToBusstopPole:        null | string;
    odptBusroutePattern:      string;
    odptFromBusstopPole:      null | string;
    odptOccupancyStatus?:     string;
    odptStartingBusstopPole:  string;
    odptTerminalBusstopPole:  string;
    odptNote?:                string;
    odptFromBusstopPoleTime?: Date | null;
}

export interface FlightInformationArrivalJSON {
    id:                            string;
    type:                          string;
    dcDate:                        Date;
    context:                       string;
    dctValid:                      Date;
    owlSameAs:                     string;
    odptAirline:                   string;
    odptOperator:                  string;
    odptArrivalGate?:              string;
    odptFlightNumber:              string[];
    odptFlightStatus?:             string;
    odptOriginAirport:             string;
    odptArrivalAirport:            string;
    odptActualArrivalTime?:        string;
    odptScheduledArrivalTime:      string;
    odptArrivalAirportTerminal?:   string;
    odptEstimatedArrivalTime?:     string;
    odptViaAirport?:               string[];
    odptAircratfType?:             string;
    odptAircraftType?:             string;
    odptFlightInformationSummary?: OdptTitle;
    odptFlightInformationText?:    OdptFlightInformationTextClass;
}

export interface OdptFlightInformationTextClass {
    en?: string;
    ja:  string;
}

export interface FlightInformationDeparture {
    id:                            string;
    type:                          string;
    dcDate:                        Date;
    context:                       string;
    dctValid:                      Date;
    owlSameAs:                     string;
    odptAirline:                   string;
    odptOperator:                  string;
    odptAircraftType?:             string;
    odptFlightNumber:              string[];
    odptFlightStatus?:             string;
    odptDepartureAirport:          string;
    odptDestinationAirport:        string;
    odptEstimatedDepartureTime?:   string;
    odptScheduledDepartureTime?:   string;
    odptFlightInformationText?:    OdptFlightInformationTextClass;
    odptFlightInformationSummary?: OdptTitle;
    odptDepartureGate?:            string;
    odptDepartureAirportTerminal?: string;
    odptActualDepartureTime?:      string;
    odptAircratfType?:             string;
    odptCheckInCounter?:           string[];
    odptViaAirport?:               string[];
}

export interface Train {
    id:                     string;
    type:                   string;
    dcDate:                 Date;
    context:                string;
    dctValid:               Date;
    odptDelay?:             number;
    owlSameAs:              string;
    odptRailway:            string;
    odptOperator:           string;
    odptToStation:          null | string;
    odptTrainType:          string;
    odptTrainOwner?:        string;
    odptFromStation:        string;
    odptTrainNumber:        string;
    odptOriginStation?:     string[];
    odptRailDirection:      string;
    odptDestinationStation: string[];
    odptCarComposition?:    number;
    odptViaRailway?:        string[];
}

export interface TrainInformation {
    id:                          string;
    type:                        string;
    dcDate:                      Date;
    context:                     string;
    dctValid:                    Date;
    owlSameAs:                   string;
    odptRailway?:                string;
    odptOperator:                string;
    odptTrainInformationText:    OdptFlightInformationTextClass;
    odptRailDirection?:          string;
    odptTrainInformationCause?:  OdptTitle;
    odptTrainInformationStatus?: OdptFlightInformationTextClass;
    odptTimeOfOrigin?:           Date;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAirport(json: string): Airport {
        return cast(JSON.parse(json),r("Airport"));
    }

    public static airportToJson(value: Airport): string {
        return JSON.stringify(uncast(value,r("Airport")), null, 2);
    }

    public static toAirportTerminal(json: string): AirportTerminal {
        return cast(JSON.parse(json),r("AirportTerminal"));
    }

    public static airportTerminalToJson(value: AirportTerminal): string {
        return JSON.stringify(uncast(value,r("AirportTerminal")), null, 2);
    }

    public static toBusTimetable(json: string): BusTimetable {
        return cast(JSON.parse(json),r("BusTimetable"));
    }

    public static busTimetableToJson(value: BusTimetable): string {
        return JSON.stringify(uncast(value,r("BusTimetable")), null, 2);
    }

    public static toBusroutePattern(json: string): BusroutePattern {
        return cast(JSON.parse(json),r("BusroutePattern"));
    }

    public static busroutePatternToJson(value: BusroutePattern): string {
        return JSON.stringify(uncast(value,r("BusroutePattern")), null, 2);
    }

    public static toBusroutePatternFare(json: string): BusroutePatternFare {
        return cast(JSON.parse(json),r("BusroutePatternFare"));
    }

    public static busroutePatternFareToJson(value: BusroutePatternFare): string {
        return JSON.stringify(uncast(value,r("BusroutePatternFare")), null, 2);
    }

    public static toBusstopPole(json: string): BusstopPole {
        return cast(JSON.parse(json), r("BusstopPole"));
    }

    public static busstopPoleToJson(value: BusstopPole): string {
        return JSON.stringify(uncast(value,r("BusstopPole")), null, 2);
    }

    public static toBusstopPoleTimetable(json: string): BusstopPoleTimetable {
        return cast(JSON.parse(json),r("BusstopPoleTimetable"));
    }

    public static busstopPoleTimetableToJson(value: BusstopPoleTimetable): string {
        return JSON.stringify(uncast(value,r("BusstopPoleTimetable")), null, 2);
    }

    public static toCalendar(json: string): Calendar {
        return cast(JSON.parse(json),r("Calendar"));
    }

    public static calendarToJson(value: Calendar): string {
        return JSON.stringify(uncast(value,r("Calendar")), null, 2);
    }

    public static toFlightSchedule(json: string): FlightSchedule {
        return cast(JSON.parse(json),r("FlightSchedule"));
    }

    public static flightScheduleToJson(value: FlightSchedule): string {
        return JSON.stringify(uncast(value,r("FlightSchedule")), null, 2);
    }

    public static toFlightStatus(json: string): FlightStatus {
        return cast(JSON.parse(json),r("FlightStatus"));
    }

    public static flightStatusToJson(value: FlightStatus): string {
        return JSON.stringify(uncast(value,r("FlightStatus")), null, 2);
    }

    public static toOperator(json: string): Operator {
        return cast(JSON.parse(json),r("Operator"));
    }

    public static operatorToJson(value: Operator): string {
        return JSON.stringify(uncast(value,r("Operator")), null, 2);
    }

    public static toPassengerSurvey(json: string): PassengerSurvey {
        return cast(JSON.parse(json),r("PassengerSurvey"));
    }

    public static passengerSurveyToJson(value: PassengerSurvey): string {
        return JSON.stringify(uncast(value,r("PassengerSurvey")), null, 2);
    }

    public static toRailDirection(json: string): RailDirection {
        return cast(JSON.parse(json),r("RailDirection"));
    }

    public static railDirectionToJson(value: RailDirection): string {
        return JSON.stringify(uncast(value,r("RailDirection")), null, 2);
    }

    public static toRailway(json: string): Railway {
        return cast(JSON.parse(json),r("Railway"));
    }

    public static railwayToJson(value: Railway): string {
        return JSON.stringify(uncast(value,r("Railway")), null, 2);
    }

    public static toRailwayFare(json: string): RailwayFare {
        return cast(JSON.parse(json),r("RailwayFare"));
    }

    public static railwayFareToJson(value: RailwayFare): string {
        return JSON.stringify(uncast(value,r("RailwayFare")), null, 2);
    }

    public static toStation(json: string): Station {
        return cast(JSON.parse(json),r("Station"));
    }

    public static stationToJson(value: Station): string {
        return JSON.stringify(uncast(value,r("Station")), null, 2);
    }

    public static toStationTimetable(json: string): StationTimetable {
        return cast(JSON.parse(json),r("StationTimetable"));
    }

    public static stationTimetableToJson(value: StationTimetable): string {
        return JSON.stringify(uncast(value,r("StationTimetable")), null, 2);
    }

    public static toTrainTimetable(json: string): TrainTimetable {
        return cast(JSON.parse(json),r("TrainTimetable"));
    }

    public static trainTimetableToJson(value: TrainTimetable): string {
        return JSON.stringify(uncast(value,r("TrainTimetable")), null, 2);
    }

    public static toTrainType(json: string): TrainType {
        return cast(JSON.parse(json),r("TrainType"));
    }

    public static trainTypeToJson(value: TrainType): string {
        return JSON.stringify(uncast(value,r("TrainType")), null, 2);
    }

    public static toBus(json: string): Bus {
        return cast(JSON.parse(json),r("Bus"));
    }

    public static busToJson(value: Bus): string {
        return JSON.stringify(uncast(value,r("Bus")), null, 2);
    }

    public static toFlightInformationArrivalJSON(json: string): FlightInformationArrivalJSON {
        return cast(JSON.parse(json),r("FlightInformationArrivalJSON"));
    }

    public static flightInformationArrivalJSONToJson(value: FlightInformationArrivalJSON): string {
        return JSON.stringify(uncast(value,r("FlightInformationArrivalJSON")), null, 2);
    }

    public static toFlightInformationDeparture(json: string): FlightInformationDeparture {
        return cast(JSON.parse(json),r("FlightInformationDeparture"));
    }

    public static flightInformationDepartureToJson(value: FlightInformationDeparture): string {
        return JSON.stringify(uncast(value,r("FlightInformationDeparture")), null, 2);
    }

    public static toTrain(json: string): Train {
        return cast(JSON.parse(json),r("Train"));
    }

    public static trainToJson(value: Train): string {
        return JSON.stringify(uncast(value,r("Train")), null, 2);
    }

    public static toTrainInformation(json: string): TrainInformation {
        return cast(JSON.parse(json),r("TrainInformation"));
    }

    public static trainInformationToJson(value: TrainInformation): string {
        return JSON.stringify(uncast(value,r("TrainInformation")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Airport": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:airportTitle", js: "odptAirportTitle", typ: r("OdptTitle") },
        { json: "odpt:airportTerminal", js: "odptAirportTerminal", typ: u(undefined, a("")) },
    ], false),
    "AirportTerminal": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:airport", js: "odptAirport", typ: "" },
        { json: "odpt:airportTerminalTitle", js: "odptAirportTerminalTitle", typ: r("OdptTitle") },
    ], false),
    "BusTimetable": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:calendar", js: "odptCalendar", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:busroutePattern", js: "odptBusroutePattern", typ: "" },
        { json: "odpt:busTimetableObject", js: "odptBusTimetableObject", typ: a(r("OdptBusTimetableObject")) },
    ], false),
    "OdptBusTimetableObject": o([
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "odpt:index", js: "odptIndex", typ: 0 },
        { json: "odpt:canGetOn", js: "odptCanGetOn", typ: u(undefined, true) },
        { json: "odpt:canGetOff", js: "odptCanGetOff", typ: u(undefined, true) },
        { json: "odpt:isMidnight", js: "odptIsMidnight", typ: u(undefined, true) },
        { json: "odpt:arrivalTime", js: "odptArrivalTime", typ: u(undefined, u(null, "")) },
        { json: "odpt:busstopPole", js: "odptBusstopPole", typ: "" },
        { json: "odpt:isNonStepBus", js: "odptIsNonStepBus", typ: u(undefined, u(true, null)) },
        { json: "odpt:departureTime", js: "odptDepartureTime", typ: u(undefined, u(null, "")) },
        { json: "odpt:destinationSign", js: "odptDestinationSign", typ: u(undefined, u(null, "")) },
    ], false),
    "BusroutePattern": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "odpt:kana", js: "odptKana", typ: u(undefined, null) },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "ug:region", js: "ugRegion", typ: u(r("UgRegion"), null) },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:pattern", js: "odptPattern", typ: "" },
        { json: "odpt:busroute", js: "odptBusroute", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:direction", js: "odptDirection", typ: u(undefined, u(null, "")) },
        { json: "odpt:busstopPoleOrder", js: "odptBusstopPoleOrder", typ: a(r("OdptBusstopPoleOrder")) },
    ], false),
    "OdptBusstopPoleOrder": o([
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "odpt:index", js: "odptIndex", typ: 0 },
        { json: "odpt:busstopPole", js: "odptBusstopPole", typ: "" },
    ], false),
    "UgRegion": o([
        { json: "type", js: "type", typ: "" },
        { json: "coordinates", js: "coordinates", typ: a(a(3.14)) },
    ], false),
    "BusroutePatternFare": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:icCardFare", js: "odptICCardFare", typ: u(undefined, 0) },
        { json: "odpt:ticketFare", js: "odptTicketFare", typ: 0 },
        { json: "odpt:toBusstopPole", js: "odptToBusstopPole", typ: "" },
        { json: "odpt:childIcCardFare", js: "odptChildICCardFare", typ: u(undefined, 0) },
        { json: "odpt:childTicketFare", js: "odptChildTicketFare", typ: u(undefined, 0) },
        { json: "odpt:fromBusstopPole", js: "odptFromBusstopPole", typ: "" },
        { json: "odpt:toBusroutePattern", js: "odptToBusroutePattern", typ: "" },
        { json: "odpt:toBusstopPoleOrder", js: "odptToBusstopPoleOrder", typ: 0 },
        { json: "odpt:fromBusroutePattern", js: "odptFromBusroutePattern", typ: "" },
        { json: "odpt:fromBusstopPoleOrder", js: "odptFromBusstopPoleOrder", typ: 0 },
    ], false),
    "BusstopPole": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "geo:lat", js: "geoLat", typ: u(3.14, null) },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "geo:long", js: "geoLong", typ: u(3.14, null) },
        { json: "odpt:kana", js: "odptKana", typ: u(undefined, u(null, "")) },
        { json: "ug:region", js: "ugRegion", typ: u(undefined, null) },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: a("") },
        { json: "odpt:busroutePattern", js: "odptBusroutePattern", typ: a("") },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "odpt:busstopPoleNumber", js: "odptBusstopPoleNumber", typ: u(undefined, u(null, "")) },
        { json: "odpt:busstopPoleTimetable", js: "odptBusstopPoleTimetable", typ: u(undefined, u(a(""), null)) },
        { json: "title", js: "title", typ: u(undefined, r("Title")) },
        { json: "titile", js: "titile", typ: u(undefined, r("Titile")) },
    ], false),
    "Titile": o([
        { json: "ja", js: "ja", typ: "" },
        { json: "ja-Hrkt", js: "jaHrkt", typ: "" },
    ], false),
    "Title": o([
        { json: "ja", js: "ja", typ: "" },
        { json: "ja-Hrkt", js: "jaHrkt", typ: "" },
        { json: "en", js: "en", typ: u(undefined, "") },
        { json: "ko", js: "ko", typ: u(undefined, u(null, "")) },
        { json: "zh-Hans", js: "zhHans", typ: u(undefined, u(null, "")) },
        { json: "zh", js: "zh", typ: u(undefined, "") },
    ], false),
    "BusstopPoleTimetable": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:busroute", js: "odptBusroute", typ: u(a(""), "") },
        { json: "odpt:calendar", js: "odptCalendar", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:busstopPole", js: "odptBusstopPole", typ: "" },
        { json: "odpt:busDirection", js: "odptBusDirection", typ: u(a(""), "") },
        { json: "odpt:busstopPoleTimetableObject", js: "odptBusstopPoleTimetableObject", typ: a(r("OdptBusstopPoleTimetableObject")) },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
    ], false),
    "OdptBusstopPoleTimetableObject": o([
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "odpt:isMidnight", js: "odptIsMidnight", typ: u(undefined, true) },
        { json: "odpt:departureTime", js: "odptDepartureTime", typ: "" },
        { json: "odpt:busroutePattern", js: "odptBusroutePattern", typ: u(undefined, "") },
        { json: "odpt:destinationSign", js: "odptDestinationSign", typ: u(undefined, "") },
        { json: "odpt:destinationBusstopPole", js: "odptDestinationBusstopPole", typ: u(undefined, "") },
        { json: "odpt:isNonStepBus", js: "odptIsNonStepBus", typ: u(undefined, true) },
        { json: "odpt:busroutePatternOrder", js: "odptBusroutePatternOrder", typ: u(undefined, 0) },
    ], false),
    "Calendar": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: u(undefined, Date) },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: u(null, "") },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:calendarTitle", js: "odptCalendarTitle", typ: u(undefined, r("OdptTitle")) },
        { json: "odpt:operator", js: "odptOperator", typ: u(undefined, "") },
        { json: "odpt:day", js: "odptDay", typ: u(undefined, a(Date)) },
        { json: "odpt:duration", js: "odptDuration", typ: u(undefined, "") },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
    ], false),
    "FlightSchedule": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:calendar", js: "odptCalendar", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:originAirport", js: "odptOriginAirport", typ: "" },
        { json: "odpt:destinationAirport", js: "odptDestinationAirport", typ: "" },
        { json: "odpt:flightScheduleObject", js: "odptFlightScheduleObject", typ: a(r("OdptFlightScheduleObject")) },
    ], false),
    "OdptFlightScheduleObject": o([
        { json: "odpt:airline", js: "odptAirline", typ: "" },
        { json: "odpt:isValidTo", js: "odptIsValidTo", typ: Date },
        { json: "odpt:originTime", js: "odptOriginTime", typ: u(undefined, "") },
        { json: "odpt:isValidFrom", js: "odptIsValidFrom", typ: Date },
        { json: "odpt:aircraftType", js: "odptAircraftType", typ: u(undefined, "") },
        { json: "odpt:flightNumber", js: "odptFlightNumber", typ: a("") },
        { json: "odpt:destinationTime", js: "odptDestinationTime", typ: u(undefined, "") },
        { json: "odpt:originDayDifference", js: "odptOriginDayDifference", typ: u(undefined, 0) },
        { json: "odpt:destinationDayDifference", js: "odptDestinationDayDifference", typ: u(undefined, 0) },
        { json: "odpt:viaAirport", js: "odptViaAirport", typ: u(undefined, a("")) },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, r("OdptNote")) },
    ], false),
    "OdptNote": o([
        { json: "ja", js: "ja", typ: "" },
    ], false),
    "FlightStatus": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:flightStatusTitle", js: "odptFlightStatusTitle", typ: r("OdptTitle") },
    ], false),
    "Operator": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operatorTitle", js: "odptOperatorTitle", typ: r("OdptTitle") },
    ], false),
    "PassengerSurvey": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: a("") },
        { json: "odpt:station", js: "odptStation", typ: a("") },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:includeAlighting", js: "odptIncludeAlighting", typ: true },
        { json: "odpt:passengerSurveyObject", js: "odptPassengerSurveyObject", typ: a(r("OdptPassengerSurveyObject")) },
    ], false),
    "OdptPassengerSurveyObject": o([
        { json: "odpt:surveyYear", js: "odptSurveyYear", typ: 0 },
        { json: "odpt:passengerJourneys", js: "odptPassengerJourneys", typ: 0 },
    ], false),
    "RailDirection": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: u(undefined, "") },
        { json: "odpt:railDirectionTitle", js: "odptRailDirectionTitle", typ: r("OdptTitle") },
    ], false),
    "Railway": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:railwayTitle", js: "odptRailwayTitle", typ: r("OdptTitle") },
        { json: "odpt:stationOrder", js: "odptStationOrder", typ: a(r("OdptStationOrder")) },
        { json: "odpt:color", js: "odptColor", typ: u(undefined, "") },
        { json: "odpt:lineCode", js: "odptLineCode", typ: u(undefined, "") },
        { json: "odpt:ascendingRailDirection", js: "odptAscendingRailDirection", typ: u(undefined, "") },
        { json: "odpt:descendingRailDirection", js: "odptDescendingRailDirection", typ: u(undefined, "") },
    ], false),
    "OdptTitle": o([
        { json: "en", js: "en", typ: "" },
        { json: "ja", js: "ja", typ: "" },
        { json: "ko", js: "ko", typ: u(undefined, "") },
        { json: "zh-Hans", js: "zhHans", typ: u(undefined, "") },
        { json: "zh-Hant", js: "zhHant", typ: u(undefined, "") },
        { json: "ja-Hrkt", js: "jaHrkt", typ: u(undefined, "") },
    ], false),
    "OdptStationOrder": o([
        { json: "odpt:index", js: "odptIndex", typ: 0 },
        { json: "odpt:station", js: "odptStation", typ: "" },
        { json: "odpt:stationTitle", js: "odptStationTitle", typ: r("OdptTitle") },
    ], false),
    "RailwayFare": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:issued", js: "dctIssued", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:toStation", js: "odptToStation", typ: "" },
        { json: "odpt:icCardFare", js: "odptICCardFare", typ: 0 },
        { json: "odpt:ticketFare", js: "odptTicketFare", typ: 0 },
        { json: "odpt:fromStation", js: "odptFromStation", typ: "" },
        { json: "odpt:childIcCardFare", js: "odptChildICCardFare", typ: 0 },
        { json: "odpt:childTicketFare", js: "odptChildTicketFare", typ: 0 },
        { json: "odpt:viaStation", js: "odptViaStation", typ: u(undefined, a("")) },
        { json: "odpt:viaRailway", js: "odptViaRailway", typ: u(undefined, a("")) },
    ], false),
    "Station": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:stationTitle", js: "odptStationTitle", typ: r("OdptTitle") },
        { json: "odpt:connectingRailway", js: "odptConnectingRailway", typ: u(undefined, a("")) },
        { json: "geo:lat", js: "geoLat", typ: u(undefined, 3.14) },
        { json: "geo:long", js: "geoLong", typ: u(undefined, 3.14) },
        { json: "odpt:stationCode", js: "odptStationCode", typ: u(undefined, "") },
        { json: "odpt:passengerSurvey", js: "odptPassengerSurvey", typ: u(undefined, a("")) },
        { json: "odpt:stationTimetable", js: "odptStationTimetable", typ: u(undefined, a("")) },
    ], false),
    "StationTimetable": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:issued", js: "dctIssued", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: "" },
        { json: "odpt:station", js: "odptStation", typ: "" },
        { json: "odpt:calendar", js: "odptCalendar", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:railDirection", js: "odptRailDirection", typ: "" },
        { json: "odpt:stationTimetableObject", js: "odptStationTimetableObject", typ: a(r("OdptStationTimetableObject")) },
    ], false),
    "OdptStationTimetableObject": o([
        { json: "odpt:train", js: "odptTrain", typ: u(undefined, "") },
        { json: "odpt:trainType", js: "odptTrainType", typ: "" },
        { json: "odpt:trainNumber", js: "odptTrainNumber", typ: u(undefined, "") },
        { json: "odpt:departureTime", js: "odptDepartureTime", typ: "" },
        { json: "odpt:destinationStation", js: "odptDestinationStation", typ: u(undefined, a("")) },
        { json: "odpt:isLast", js: "odptIsLast", typ: u(undefined, true) },
        { json: "odpt:isOrigin", js: "odptIsOrigin", typ: u(undefined, true) },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, r("OdptNote")) },
        { json: "odpt:trainName", js: "odptTrainName", typ: u(undefined, a(r("OdptTitle"))) },
        { json: "odpt:platformNumber", js: "odptPlatformNumber", typ: u(undefined, "") },
        { json: "odpt:viaRailway", js: "odptViaRailway", typ: u(undefined, a("")) },
    ], false),
    "TrainTimetable": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:issued", js: "dctIssued", typ: Date },
        { json: "odpt:train", js: "odptTrain", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: "" },
        { json: "odpt:calendar", js: "odptCalendar", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:trainType", js: "odptTrainType", typ: "" },
        { json: "odpt:trainNumber", js: "odptTrainNumber", typ: "" },
        { json: "odpt:originStation", js: "odptOriginStation", typ: u(undefined, a("")) },
        { json: "odpt:railDirection", js: "odptRailDirection", typ: "" },
        { json: "odpt:destinationStation", js: "odptDestinationStation", typ: u(undefined, a("")) },
        { json: "odpt:trainTimetableObject", js: "odptTrainTimetableObject", typ: a(r("OdptTrainTimetableObject")) },
        { json: "odpt:previousTrainTimetable", js: "odptPreviousTrainTimetable", typ: u(undefined, a("")) },
        { json: "odpt:nextTrainTimetable", js: "odptNextTrainTimetable", typ: u(undefined, a("")) },
        { json: "odpt:viaRailway", js: "odptViaRailway", typ: u(undefined, a("")) },
    ], false),
    "OdptTrainTimetableObject": o([
        { json: "odpt:departureTime", js: "odptDepartureTime", typ: u(undefined, "") },
        { json: "odpt:departureStation", js: "odptDepartureStation", typ: u(undefined, "") },
        { json: "odpt:arrivalTime", js: "odptArrivalTime", typ: u(undefined, "") },
        { json: "odpt:arrivalStation", js: "odptArrivalStation", typ: u(undefined, "") },
        { json: "odpt:platformNumber", js: "odptPlatformNumber", typ: u(undefined, "") },
    ], false),
    "TrainType": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dc:title", js: "dcTitle", typ: "" },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:trainTypeTitle", js: "odptTrainTypeTitle", typ: r("OdptTitle") },
    ], false),
    "Bus": o([
        { json: "@id", js: "id", typ: u(null, "") },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "geo:lat", js: "geoLat", typ: u(undefined, 3.14) },
        { json: "@context", js: "context", typ: "" },
        { json: "geo:long", js: "geoLong", typ: u(undefined, 3.14) },
        { json: "dct:valid", js: "dctValid", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:azimuth", js: "odptAzimuth", typ: u(undefined, 3.14) },
        { json: "odpt:busroute", js: "odptBusroute", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:busNumber", js: "odptBusNumber", typ: "" },
        { json: "odpt:frequency", js: "odptFrequency", typ: 0 },
        { json: "odpt:busTimetable", js: "odptBusTimetable", typ: u(undefined, u(null, "")) },
        { json: "odpt:toBusstopPole", js: "odptToBusstopPole", typ: u(null, "") },
        { json: "odpt:busroutePattern", js: "odptBusroutePattern", typ: "" },
        { json: "odpt:fromBusstopPole", js: "odptFromBusstopPole", typ: u(null, "") },
        { json: "odpt:occupancyStatus", js: "odptOccupancyStatus", typ: u(undefined, "") },
        { json: "odpt:startingBusstopPole", js: "odptStartingBusstopPole", typ: "" },
        { json: "odpt:terminalBusstopPole", js: "odptTerminalBusstopPole", typ: "" },
        { json: "odpt:note", js: "odptNote", typ: u(undefined, "") },
        { json: "odpt:fromBusstopPoleTime", js: "odptFromBusstopPoleTime", typ: u(undefined, u(Date, null)) },
    ], false),
    "FlightInformationArrivalJSON": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:valid", js: "dctValid", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:airline", js: "odptAirline", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:arrivalGate", js: "odptArrivalGate", typ: u(undefined, "") },
        { json: "odpt:flightNumber", js: "odptFlightNumber", typ: a("") },
        { json: "odpt:flightStatus", js: "odptFlightStatus", typ: u(undefined, "") },
        { json: "odpt:originAirport", js: "odptOriginAirport", typ: "" },
        { json: "odpt:arrivalAirport", js: "odptArrivalAirport", typ: "" },
        { json: "odpt:actualArrivalTime", js: "odptActualArrivalTime", typ: u(undefined, "") },
        { json: "odpt:scheduledArrivalTime", js: "odptScheduledArrivalTime", typ: "" },
        { json: "odpt:arrivalAirportTerminal", js: "odptArrivalAirportTerminal", typ: u(undefined, "") },
        { json: "odpt:estimatedArrivalTime", js: "odptEstimatedArrivalTime", typ: u(undefined, "") },
        { json: "odpt:viaAirport", js: "odptViaAirport", typ: u(undefined, a("")) },
        { json: "odpt:aircratfType", js: "odptAircratfType", typ: u(undefined, "") },
        { json: "odpt:aircraftType", js: "odptAircraftType", typ: u(undefined, "") },
        { json: "odpt:flightInformationSummary", js: "odptFlightInformationSummary", typ: u(undefined, r("OdptTitle")) },
        { json: "odpt:flightInformationText", js: "odptFlightInformationText", typ: u(undefined, r("OdptFlightInformationTextClass")) },
    ], false),
    "OdptFlightInformationTextClass": o([
        { json: "en", js: "en", typ: u(undefined, "") },
        { json: "ja", js: "ja", typ: "" },
    ], false),
    "FlightInformationDeparture": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:valid", js: "dctValid", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:airline", js: "odptAirline", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:aircraftType", js: "odptAircraftType", typ: u(undefined, "") },
        { json: "odpt:flightNumber", js: "odptFlightNumber", typ: a("") },
        { json: "odpt:flightStatus", js: "odptFlightStatus", typ: u(undefined, "") },
        { json: "odpt:departureAirport", js: "odptDepartureAirport", typ: "" },
        { json: "odpt:destinationAirport", js: "odptDestinationAirport", typ: "" },
        { json: "odpt:estimatedDepartureTime", js: "odptEstimatedDepartureTime", typ: u(undefined, "") },
        { json: "odpt:scheduledDepartureTime", js: "odptScheduledDepartureTime", typ: u(undefined, "") },
        { json: "odpt:flightInformationText", js: "odptFlightInformationText", typ: u(undefined, r("OdptFlightInformationTextClass")) },
        { json: "odpt:flightInformationSummary", js: "odptFlightInformationSummary", typ: u(undefined, r("OdptTitle")) },
        { json: "odpt:departureGate", js: "odptDepartureGate", typ: u(undefined, "") },
        { json: "odpt:departureAirportTerminal", js: "odptDepartureAirportTerminal", typ: u(undefined, "") },
        { json: "odpt:actualDepartureTime", js: "odptActualDepartureTime", typ: u(undefined, "") },
        { json: "odpt:aircratfType", js: "odptAircratfType", typ: u(undefined, "") },
        { json: "odpt:checkInCounter", js: "odptCheckInCounter", typ: u(undefined, a("")) },
        { json: "odpt:viaAirport", js: "odptViaAirport", typ: u(undefined, a("")) },
    ], false),
    "Train": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:valid", js: "dctValid", typ: Date },
        { json: "odpt:delay", js: "odptDelay", typ: u(undefined, 0) },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: "" },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:toStation", js: "odptToStation", typ: u(null, "") },
        { json: "odpt:trainType", js: "odptTrainType", typ: "" },
        { json: "odpt:trainOwner", js: "odptTrainOwner", typ: u(undefined, "") },
        { json: "odpt:fromStation", js: "odptFromStation", typ: "" },
        { json: "odpt:trainNumber", js: "odptTrainNumber", typ: "" },
        { json: "odpt:originStation", js: "odptOriginStation", typ: u(undefined, a("")) },
        { json: "odpt:railDirection", js: "odptRailDirection", typ: "" },
        { json: "odpt:destinationStation", js: "odptDestinationStation", typ: a("") },
        { json: "odpt:carComposition", js: "odptCarComposition", typ: u(undefined, 0) },
        { json: "odpt:viaRailway", js: "odptViaRailway", typ: u(undefined, a("")) },
    ], false),
    "TrainInformation": o([
        { json: "@id", js: "id", typ: "" },
        { json: "@type", js: "type", typ: "" },
        { json: "dc:date", js: "dcDate", typ: Date },
        { json: "@context", js: "context", typ: "" },
        { json: "dct:valid", js: "dctValid", typ: Date },
        { json: "owl:sameAs", js: "owlSameAs", typ: "" },
        { json: "odpt:railway", js: "odptRailway", typ: u(undefined, "") },
        { json: "odpt:operator", js: "odptOperator", typ: "" },
        { json: "odpt:trainInformationText", js: "odptTrainInformationText", typ: r("OdptFlightInformationTextClass") },
        { json: "odpt:railDirection", js: "odptRailDirection", typ: u(undefined, "") },
        { json: "odpt:trainInformationCause", js: "odptTrainInformationCause", typ: u(undefined, r("OdptTitle")) },
        { json: "odpt:trainInformationStatus", js: "odptTrainInformationStatus", typ: u(undefined, r("OdptFlightInformationTextClass")) },
        { json: "odpt:timeOfOrigin", js: "odptTimeOfOrigin", typ: u(undefined, Date) },
    ], false),
};