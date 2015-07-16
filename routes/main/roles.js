var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数

var Role = tables.Role;   //行政单元表模型
/* 应该在这里实现users表的RESTful操作 */
//下面是针对/users路径的get方法请求
//index动作
router.get('/', function(req, res) {
  var currentPage = 1,
      pageSize = 10,       //这里应该从配置文件取
      pagesHTML = '',     //要生成的分页器
      pages = 0;          //总页数

  if (typeof(req.query.s) !== 'undefined' && !isNaN(req.query.s)){
    currentPage = parseInt(req.query.s, 10); //将字符串转为数字
  }
  
  Role.findAndCountAll({
    offset: (currentPage - 1 ) * pageSize,
    limit: pageSize,
    attributes: ['id', 'rolename', 'roletype', 'roleintro']
  }).then(function(result) {
    pages = (result.count > pageSize) ? Math.ceil(result.count/pageSize) : 1; //计算总页数
    pagesHTML = cs.makePager(result.count, currentPage, pageSize); //生成分页器的
    res.render('roles/roles_all', { 
      title: '查看所有角色列表' ,
      pagesHTML: pagesHTML,
      roles: result.rows,
      total: pages,
      curPage: currentPage,
      sess: req.session
    });
  });
});

//下面是针对/roles/new路径的get方法请求，
//new动作
router.get('/new', function(req, res) {
  res.render('roles/roles_new',{
    title: '角色创建',
    sess: req.session
  });
});

//下面是针对/roles路径的post方法请求
//create动作
router.post('/', function(req, res) {
 var rolename = req.body.rolename,
      roletype = req.body.roletype,
      roleintro = req.body.roleintro;

  Role.findOrCreate({
    where : {
      rolename: rolename
    },
    defaults: {
      roletype: roletype,
      roleintro: roleintro
    }
  }).spread(function(role,created){
    if (created) {
      res.send({dStyle: 'alert-success', msg: '创建角色成功！'});
    }else{
      res.send({dStyle: 'alert-warning', msg: '此角色已存在！'});
    }
  }).catch(function() {
    res.send({dStyle: 'alert-info', msg: '系统出错！稍后再试'});
  });

});



//下面是针对/roles/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Role.destroy({
    where:{id : id}
  }).then(function(result) {
    if (result) {
      req.flash("删除成功！");
      res.redirect('/roles');  
    } else {
      req.flash("找不到要删除的记录！");
      res.redirect('back');
    }
  }).catch(function(){
    req.flash("系统错误！请稍后再试");
    res.redirect('back');
  });

});

module.exports = router;