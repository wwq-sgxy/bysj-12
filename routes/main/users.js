var express = require('express');
//var User = require('../models/user');   //加载User模型
var router = express.Router();

/* 应该在这里实现users表的RESTful操作 */
//下面是针对/users路径的get方法请求
//index动作
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  res.send('这里应展示users表的全部记录');
});

//下面是针对/users/new路径的get方法请求，
//new动作
router.get('/new', function(req, res) {
  res.send('这里应获取创建新纪录的表单！');
});

//下面是针对/users路径的post方法请求
//create动作
router.post('/', function(req, res) {
  res.send('这里应处理new表单提交的数据，然后创建新纪录');
});

//下面是针对/users/:id路径的get方法请求，
//show动作
router.get('/:id', function(req, res) {
  res.send('这里应获取users表ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id/edit路径的get方法请求
//edit动作
router.get('/:id/edit', function(req, res) {
  res.send('这里应获取编辑表单，编辑ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  res.send('这里应处理编辑表单提交的数据，然后更新ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  res.send('这里应处理删除请求，删除ID为'+req.params.id+'的记录');
});

module.exports = router;