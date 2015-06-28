var express = require('express');
var router = express.Router();

//处理登录--获取登录表单
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Express'});
  //res.send('<h1>登录</h1>');
});

//处理登录--提交登录表单
router.post('/login', function(req, res, next) {
  //res.render('login', {title: 'Express'});
  res.send('你的登录已处理！');
});

//处理注销
router.get('/logout', function(req, res, next) {
  //res.render('login', {title: 'Express'});
  res.end("注销会话中的身份认证");
});

module.exports = router;