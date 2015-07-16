var express = require('express');
var router = express.Router();

/* 获取【网上调查表决和意见反馈系统（李华鸿）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('lihuahong/index', { title: '主页', sess: sess });
});

module.exports = router;