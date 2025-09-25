#!/bin/bash
# Cron job to run sneaker data aggregation every 6 hours
cd /workspaces/SoleGrithm/server
/usr/bin/env npx ts-node jobs/aggregate-sneaker-data.ts >> ../logs/aggregate-sneaker-data.log 2>&1
