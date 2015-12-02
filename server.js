var koa = require('koa');
var app = koa();
var isDev = app.env==="development";
var path = require('path');
var util = require('./util');

//配置文件
var config = require('./config');

/*static 配置*/
var staticPath = __dirname +"/" +(isDev?'public/src':'public/build');
app.use(require('koa-static')(staticPath));

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
xtplApp(app,{
    views: config.viewDir
});


var router = require('koa-router');

app.use(router(app));


/*读取路由文件*/
util.getGlobbedFiles('app/**/*.routers.js').forEach(function(routePath) {
		try {
			require(path.resolve(routePath))(app);
		} catch (err) {
			console.log(err.stack);
		}
});

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;
