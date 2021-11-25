import {
  readerFromStreamReader,
  copy,
} from "https://deno.land/std@0.110.0/io/mod.ts";

const API_BASE_URL = "https://api-tokyochallenge.odpt.org/api/v4/";

const ODPT_API_KEY = Deno.env.get("ODPT_API_KEY");

const FEEDS = [
  "Train",
  "TrainInformation",
//  "Bus",
//  "FlightInformationArrival",
//  "FlightInformationDeparture",
];

const encoder = new TextEncoder();

if (ODPT_API_KEY === undefined) {
  throw new Error("ODPT_API_KEY is undefined");
}

function getFeedUrl(feed: string, parameters: Record<string, string>): string {
  const params = new URLSearchParams();
  params.append("acl:consumerKey", ODPT_API_KEY!);
  for (const [key, value] of Object.entries(parameters)) {
    params.append(key, value);
  }

  return `${API_BASE_URL}odpt:${feed}?${params.toString()}`;
}

async function downloadFeed(
  feed: string,
  parameters: Record<string, string>,
  version: string
) {
  Deno.stderr.write(encoder.encode(`Downloading: ${feed}\n`));
  const res = await fetch(getFeedUrl(feed, parameters));
  const reader = res?.body?.getReader();
  if (reader) {
    const r = readerFromStreamReader(reader);
    const file = await Deno.open(`data/${feed}/${version}.json`, {
      create: true,
      write: true,
    });
    await copy(r, file);
    file.close();
  }
}

export async function download(): Promise<string> {
  const version = new Date().toISOString();

  for (const feed of FEEDS) {
    await Deno.mkdir(`data/${feed}`, { recursive: true });
    await downloadFeed(feed, {}, version);
  }

  return version;
}

Deno.stdout.write(encoder.encode(await download()))

setInterval(
  async () => Deno.stdout.write(encoder.encode(await download())),
  15 * 1000
);