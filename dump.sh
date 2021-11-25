#!/bin/bash
TABLES="agency calendar routes shapes stops trips stop_times transfers"

# This script takes two arguments: 
# A zip file containing gtfs files, and a schema name (defaults to gtfs)
ZIP=$1
SCHEMA=${2=gtfs}
set -e

mkdir -p ${PWD}/${ZIP}

# Called with name of table
function dump_table()
{
    psql -c "COPY (SELECT * FROM ${SCHEMA}.${1}) TO '${PWD}/${ZIP}/${1}.txt' WITH DELIMITER AS ',' HEADER CSV"
}

# for each table, check if file exists
for table in $TABLES; do
    # read it into db
    dump_table "$table"
done
