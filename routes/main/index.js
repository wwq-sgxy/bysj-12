var express = require('express');
var router = express.Router();

/* 获取主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('index', { title: '主页', sess: sess });
});

//处理注册
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: '注册' });
});

module.exports = router;
