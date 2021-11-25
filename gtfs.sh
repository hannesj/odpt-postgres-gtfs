#! /bin/sh
set -e

psql -d postgres --file=gtfsViews.sql

for f in shapes/*.txt;
  do echo "$f";
  psql -d postgres -c "\copy gtfs.shapes_manual FROM '$f' DELIMITER ',' CSV HEADER;"
done