#!/usr/bin/env node
'use strict';
var app = require('../server'),
    
    config = require('../config'),
    path = require('path'),
    graceful = require('graceful');


var port = process.env.PORT || 6001;

var cluster = require('cluster');

var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  };

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    });
} else {

    var server = app.listen(port, function () {
        console.log('app server listening on port ' + server.address().port)
    //logger.info('app server listening on port ' + server.address().port);
    });

}


// graceful({
//     server: server,
//     killTimeout: 30 * 1000,
//     error: function (err, throwErrorCount) {
//         if (err.message) {
//             err.message +=
//                 ' (uncaughtException throw ' + throwErrorCount +
//                 ' times on pid:' + process.pid + ')';
//         }
//       // logger.error(err);
//     }
// });
