#! /bin/sh
set -e

export ODPT_DATA_VERSION=$(deno run --allow-write=data --allow-net --allow-env=ODPT_API_KEY download.ts)

deno run --allow-read=data,odpt-import --allow-net --allow-env=ODPT_DATA_VERSION odpt-import/import.ts

psql -d postgres --file=odpt-improvement/updateTimesPastMidnight.sql
psql -d postgres --file=odpt-improvement/updateStationLocations.sql
psql -d postgres --file=odpt-improvement/updateBusstopPoleLocations.sql
psql -d postgres --file=odpt-improvement/updateArrivalTimes1.sql

deno run --allow-net odpt-improvement/updateArrivalTimes2.ts

psql -d postgres --file=odpt-improvement/shinagawaTrainType.sql
psql -d postgres --file=odpt-improvement/missingStopTimes.sql
psql -d postgres --file=odpt-improvement/keiseiNotes.sql
psql -d postgres --file=odpt-improvement/keioNotes.sql

deno run --allow-net odpt-improvement/generateTraintimetables.ts
deno run --allow-net odpt-improvement/moveSingleTimesToPreviousTrain.ts

psql -d postgres --file=odpt-improvement/createArrivalStopForLongTransfers.sql

deno run --allow-net odpt-improvement/fixBrokenTimetables.ts
deno run --allow-net odpt-improvement/connectionsToGeneratedTimetables.ts