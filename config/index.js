//应用配置文件
var path = require('path');
var config = {
    //端口号配置
    "port": 3004,
    //模板所在的目录
    "viewDir": path.join(__dirname,'../app','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'../', 'log'),

};


module.exports = config;