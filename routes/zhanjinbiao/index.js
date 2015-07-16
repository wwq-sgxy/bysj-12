var express = require('express');
var router = express.Router();

/* 获取【师生课外学习交流平台（詹锦标）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('zhanjinbiao/index', { title: '主页', sess: sess });
});

module.exports = router;