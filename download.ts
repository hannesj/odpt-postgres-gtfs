import { readerFromStreamReader, copy } from "https://deno.land/std@0.110.0/io/mod.ts";

const API_BASE_URL = "https://api-tokyochallenge.odpt.org/api/v4/";

const ODPT_API_KEY = Deno.env.get("ODPT_API_KEY");

const FEEDS = [
  "Calendar",
  "Operator",
  "Station",
  "StationTimetable",
  "TrainTimetable",
  "TrainType",
  "RailDirection",
  "Railway",
  "RailwayFare",
  "PassengerSurvey",
  "BusTimetable",
  "BusroutePattern",
  "BusroutePatternFare",
  "BusstopPole",
  "BusstopPoleTimetable",
  "Airport",
  "AirportTerminal",
  "FlightSchedule",
  "FlightStatus",
];

const encoder = new TextEncoder();

function getFeedUrl(feed: string): string {
  return `${API_BASE_URL}odpt:${feed}.json?acl:consumerKey=${ODPT_API_KEY}`;
}

async function downloadFeed(feed: string, directory: string) {
  Deno.stderr.write(encoder.encode(`Downloading: ${feed}\n`))
  const res = await fetch(getFeedUrl(feed));
  const reader = res?.body?.getReader();
  if (reader) {
    const r = readerFromStreamReader(reader);
    const file = await Deno.open(`${directory}/${feed}.json`, {
      create: true,
      write: true,
    });
    await copy(r, file);
    file.close();
  }
}

export async function download(): Promise<string> {
  const version = new Date().toISOString()

  const directory = `data/${version}`

  await Deno.mkdir(directory, {recursive: true})

  for (const feed of FEEDS) {
    await downloadFeed(feed, directory)
  }

  return directory
}

Deno.stdout.write(encoder.encode(await download()))
