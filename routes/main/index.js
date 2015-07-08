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
  var sess = req.session;
  res.render('signup', { title: '注册', sess: sess });
});

router.get('/test', function(req, res, next) {
  var Unitinfo = require("../../config/units_metadata.js");
  var units = new Unitinfo();
  var opts = units.utype;
  res.render('test', { title: '主页', opts: opts });
});

module.exports = router;
