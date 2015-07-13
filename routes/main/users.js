var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数

var User = tables.User;   //用户表模型
/* 应该在这里实现users表的RESTful操作 */
//下面是针对/users路径的get方法请求
//index动作

router.get('/', function(req, res) {
  
  res.render('users/users_all', { 
      title: '用户表' ,
      sess: req.session
    });
  /*var currentPage = 1,
      pageSize = 10,       //这里应该从配置文件取
      pagesHTML = '',     //要生成的分页器
      pages = 0;          //总页数

  if (typeof(req.query.s) !== 'undefined' && !isNaN(req.query.s)){
    currentPage = parseInt(req.query.s, 10); //将字符串转为数字
  }

  User.count().then(function(total) {
    pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1; //计算总页数
    pagesHTML = cs.makePager(total, currentPage, pageSize); //生成分页器
    //currentPage = (currentPage <= 0 || currentPage > pages) ? 1 : currentPage;
  }).catch(function(err){
    res.send(err);
  });
  User.findAll({
    offset: (currentPage - 1 ) * pageSize,
    limit: pageSize,
    order: 'numid ASC ',
    attributes: ['id','numid ','name','astatus']
  }).then(function(users){
    res.render('users/users_all', { 
      title: '用户表' ,
      pagesHTML: pagesHTML,
      users: users,
      total: pages,
      curPage: currentPage,
      sess: req.session
    });
  }).catch(function(err) {
    req.flash(err);
  });*/
 // res.send('这里应展示users表的全部记录');
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
   User.findOne({
    where:{ id: req.params.id }
  }).then(function(user) {
    if (!user) {
      res.render('tips', { 
        info: "不存在这样的记录！"
      });
    }
    user.createdTime = cs.dbTimeToLocaltime({
      dbtime: user.createdAt,
      tz: 8
    });
    user.updatedTime = cs.dbTimeToLocaltime({
      dbtime: user.updatedAt,
      tz: 8
    });
    res.render('users/users_show', {
      title: '详细内容显示',
      user:user,
      sess: req.session
    });
  }).catch(function(err) {
    console.log(err);
  });
}); 


//下面是针对/users/:id/edit路径的get方法请求
//edit动作
router.get('/:id/edit', function(req, res) {
  var id=req.params.id;
  
  User.findOne({
    where:{id:id},
    attributes:['numid','name','pass','unitid','astatus','cidset']
  }).then(function(user){
    if(!user){
      res.render('tips',{
        info:"不存在这样的记录！"
      });
    }
    res.render('users/users_edit',{
      title:'编辑用户表单',
      user:user,
      sess:req.session
    });
  });
  //res.send('这里应获取编辑表单，编辑ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  var id=req.params.id,
      values=JSON.stringify(req.body),
      numid=req.body.numid;
      
      User.findOne({
        where:{numid:numid}
      }).then(function(user){
        if (user && user.id != id) {
      req.flash("此单元编码已存在！");
      res.redirect('back');
    }
        else{
          User.update(
          values, {
            where:{id:id}
          }).then(function(user){
            req.flash("更新成功!记录ID为:"+ id + '\n' +values);
            res.redirect('back');
          }).catch(function(){
            req.flash("更新失败！");
            res.redirect('back');
          });
        }
      }).catch(function(){
    req.flash("系统错误操作失败！");
    res.redirect('back');
  });
        
  //res.send('这里应处理编辑表单提交的数据，然后更新ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  //res.send('这里应处理删除请求，删除ID为'+req.params.id+'的记录');
  var id = req.params.id;

  User.destroy({
    where:{id : id}
  }).then(function(ret) {
    if (ret) {
      req.flash("删除成功！");
      res.redirect('/users');  
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