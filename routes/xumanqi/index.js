var express = require('express');
var router = express.Router();

/* 获取【学生事务Web应用系统（许曼琪）】的主页 */
router.get('/', function(req, res, next) {
  var sess = req.session;
  //if (typeof(sess.uid) == 'undefined') { sess.uid = null; }
  res.render('xumanqi/index', { title: '主页', sess: sess });
});

module.exports = router;