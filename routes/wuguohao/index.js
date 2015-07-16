var express = require('express');
var router = express.Router();

/* 获取【课堂教学Web应用系统（吴国豪）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('wuguohao/index', { title: '主页', sess: sess });
  //res.render('wuguohao/index', { title: '主页' });
});

module.exports = router;