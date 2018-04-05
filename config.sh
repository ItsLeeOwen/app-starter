#!/bin/bash
# for projects using env vars
# "start": "./config.sh || node_modules/.bin/webpack-dev-server"

if [ -e ./.env ]
then
    source ./.env;
else
    echo ".env file not found"
    exit 0
fi