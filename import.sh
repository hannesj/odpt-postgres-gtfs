#! /bin/sh
set -e

export ODPT_DATA_VERSION=$(deno run --allow-write=data --allow-net --allow-env=ODPT_API_KEY download.ts)

deno run --allow-read=data,odpt-import --allow-net --allow-env=ODPT_DATA_VERSION odpt-import/import.ts