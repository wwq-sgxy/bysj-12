var express = require('express'),
    router = express.Router(),
    tables = require('../../models/tabled.js'),  //表定义
    crypto = require('crypto');

//处理登录--获取登录表单
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'login', sess: req.session});
  //res.send('<h1>登录</h1>');
});

//处理登录--提交登录表单
router.post('/login', function(req, res, next) {
  var User = tables.User;
  
  //res.send(req.body.userid + ' ' + req.body.pass);
  var hmac = crypto.createHmac('sha1', '650827');
  hmac.update(req.body.pass);
  var pass = hmac.digest('hex');
  User.findOne({
    where: {numid: req.body.userid, pass: pass},
    attributes: ['id', 'numid', 'name']
  }).then(function(user) {
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      req.flash("账号不存在或与密码不匹配！");
      //req.flash("账号不能为空！");
      res.redirect('back');
    }
  });
  
});

//处理注销
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;