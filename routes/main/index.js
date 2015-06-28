var express = require('express');
var router = express.Router();

/* 获取主页 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//处理注册
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

module.exports = router;
