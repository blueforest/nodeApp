'use strict';

var controller = require('./index.controller.js');
module.exports = function(app){
    //首页
    app.get('/',controller.index);
};