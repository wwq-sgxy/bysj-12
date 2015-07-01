var express = require('express');               //载入express模块
var path = require('path');                     //载入path模块
var favicon = require('serve-favicon');         //载入应用程序小图标
var logger = require('morgan');                 //载入日志模块
var cookieParser = require('cookie-parser');    //载入cookie-parser模块
var session = require('express-session');       //载入express-session模块
var RedisStore = require('connect-redis')(session); //载入connect-redis模块
var bodyParser = require('body-parser');        //载入body-parser模块

//var tables = require('./models/tabled.js');  //表定义
var routes = require('./routes/main/index');   //载入根路由
var users = require('./routes/main/users');    //载入users路由
var auth = require('./routes/main/session');   //载入会话路由，用做身份认证

var app = express();          //生成express应用程序实例

//auth.tables = tables;
// 建立视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 在/public中载入应用程小图标之后，即可去掉下一行注释
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));       //启用日志中间件
app.use(bodyParser.json());   //启用请求体json解析中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());      //启用cookie中间件
app.use(session({
    store: new RedisStore(),
    secret: 'bysj12 webt',
    resave: false,
    saveUninitialized: false
}));
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')));  //启用静态文件服务中间件

app.use('/', routes);       //启用根路由中间件
app.use('/users', users);   //启用users路由中间件
app.use('/auth', auth);     //启用session路由中间件

// 捕获404错误并转错误处理函数
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

// 开发环境中的错误处理
// 会显示堆栈跟踪
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境的错误处理
// 无堆栈跟踪泄露给用户
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;   //导出express应用程序实例
