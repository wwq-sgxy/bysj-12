var express = require('express');
var router = express.Router();

/* 获取【实验课Web管理系统（曾蔚）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('zenwei/index', { title: '主页', sess: sess });
});

module.exports = router;