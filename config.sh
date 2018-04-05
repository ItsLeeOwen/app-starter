#!/bin/bash
# for projects using env vars
# "start": "./config.sh || node_modules/.bin/webpack-dev-server"

if [ -e ./.env ]
then
    source ./.env;
    exit 1
else
    echo ".env file not found, see README"
    exit 0
fi