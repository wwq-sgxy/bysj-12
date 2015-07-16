//应用程序主文件
var express = require('express');               //载入express模块
var path = require('path');                     //载入path模块
var favicon = require('serve-favicon');         //载入应用程序小图标
var logger = require('morgan');                 //载入日志模块
var cookieParser = require('cookie-parser');    //载入cookie-parser模块
var session = require('express-session');       //载入express-session模块
var RedisStore = require('connect-redis')(session); //载入connect-redis模块
var bodyParser = require('body-parser');        //载入body-parser模块
var methodOverride = require('method-override');

//此处载入【用户管理系统】的路由处理器模块
var routes = require('./routes/main/index');   //载入根路由
var users = require('./routes/main/users');    //载入users路由
var auth = require('./routes/main/session');   //载入会话路由，用做身份认证
var units = require('./routes/main/units');    //载入units路由
var roles = require('./routes/main/roles');    //载入roles路由

//此处载入【课堂教学Web应用系统（吴国豪）】的路由处理器模块
var wgh_routes = require('./routes/wuguohao/index');   //载入根路由

//此处载入【综合信息服务系统（黄思敏）】的路由处理器模块
var hsm_routes = require('./routes/huangsimin/index');   //载入根路由

//此处载入【学生事务Web应用系统（许曼琪）】的路由处理器模块
var xmq_routes = require('./routes/xumanqi/index');   //载入根路由

//此处载入【实验课Web管理系统（曾蔚）】的路由处理器模块
var zw_routes = require('./routes/zenwei/index');   //载入根路由

//此处载入【网上调查表决和意见反馈系统（李华鸿）】的路由处理器模块
var lhh_routes = require('./routes/lihuahong/index');   //载入根路由

//此处载入【电子资料管理分享平台（李业富）】的路由处理器模块
var lyf_routes = require('./routes/liyefu/index');   //载入根路由

//此处载入【师生课外学习交流平台（詹锦标）】的路由处理器模块
var zjb_routes = require('./routes/zhanjinbiao/index');   //载入根路由


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
app.use(methodOverride('_method'));
app.use(cookieParser());      //启用cookie中间件
app.use(session({
    store: new RedisStore(),
    secret: 'bysj12 webt',
    resave: false,
    saveUninitialized: false
}));
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')));  //启用静态文件服务中间件
app.use(express.static(path.join(__dirname, 'config')));

//此处加载【用户管理系统】的路由中间件
app.use('/', routes);       //启用根路由中间件
app.use('/users', users);   //启用users路由中间件
app.use('/auth', auth);     //启用session路由中间件
app.use('/units', units);   //启用units路由中间件
app.use('/roles', roles);   //启用units路由中间件

//此处加载【课堂教学Web应用系统（吴国豪）】的路由中间件
app.use('/wgh', wgh_routes);       //启用根路由中间件

//此处加载【综合信息服务系统（黄思敏）】的路由中间件
app.use('/hsm', hsm_routes);       //启用根路由中间件

//此处加载【学生事务Web应用系统（许曼琪）】的路由中间件
app.use('/xmq', xmq_routes);       //启用根路由中间件

//此处加载【实验课Web管理系统（曾蔚）】的路由中间件
app.use('/zw', zw_routes);       //启用根路由中间件

//此处加载【网上调查表决和意见反馈系统（李华鸿）】的路由中间件
app.use('/lhh', lhh_routes);       //启用根路由中间件

//此处加载【电子资料管理分享平台（李业富）】的路由中间件
app.use('/lyf', lyf_routes);       //启用根路由中间件

//此处加载【师生课外学习交流平台（詹锦标）】的路由中间件
app.use('/zjb', zjb_routes);       //启用根路由中间件


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
      error: err,
      method: req.method + ":" + req.originalMethod
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
