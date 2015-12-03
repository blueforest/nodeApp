#!/bin/bash#!/bin/bash
sh bin/build.sh
export PATH=/usr/local/bin:/bin:/usr/bin:$PATH
export NODE_ENV="production"
NODEJS=/usr/local/bin/node
NODEJS --harmony bin/app.js
