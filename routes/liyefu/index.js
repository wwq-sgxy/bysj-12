var express = require('express');
var router = express.Router();

/* 获取【电子资料管理分享平台（李业富）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('liyefu/index', { title: '主页', sess: sess });
});

module.exports = router;