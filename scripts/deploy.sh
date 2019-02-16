#!/bin/bash

#heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git

#heroku create app-starter-heroku
heroku stack:set container
#heroku ps:scale web=1
