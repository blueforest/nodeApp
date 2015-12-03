#!/usr/bin/env node
'use strict';
var app = require('../server'),
    
    config = require('../config'),
    path = require('path'),
    graceful = require('graceful');




var port = process.env.PORT || 6001;

// var log4js = require('log4js');
// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: config.logDir, category: 'cheese' }
//   ]
// });

var server = app.listen(port, function () {
    console.log('app server listening on port ' + server.address().port)
    //logger.info('app server listening on port ' + server.address().port);
});

graceful({
    server: server,
    killTimeout: 30 * 1000,
    error: function (err, throwErrorCount) {
        if (err.message) {
            err.message +=
                ' (uncaughtException throw ' + throwErrorCount +
                ' times on pid:' + process.pid + ')';
        }
      // logger.error(err);
    }
});
