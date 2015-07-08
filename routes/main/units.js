var express = require('express');
//var User = require('../models/user');   //加载User模型
var router = express.Router();
var tables = require('../../models/tabled.js');
var cs = require('../../models/share.js');
//var Unitinfo = require('../config/units_metadata.js');
//var unitinfo = new Unitinfo();

var Unit = tables.Unit;
/* 应该在这里实现users表的RESTful操作 */
//下面是针对/users路径的get方法请求
//index动作
router.get('/', function(req, res) {
  var currentPage = 1,
      pageSize = 1,  //这里应该从配置文件取
      pagesHTML = '',
      pages = 0;
  
  if(typeof(req.query.s) !== 'undefined'){
    currentPage = parseInt(req.query.s, 10); //将字符串转为数字
  }

  Unit.count().then(function(total){
    pagesHTML = cs.makePager(total, currentPage, pageSize);
    pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1;
  }).catch(function(err){
    res.send(err);
  });
  
  Unit.findAll({
    offset: (currentPage -1 ) * pageSize,
    limit: pageSize,    //从这里应还要指定从第几条开始取。limit第几条开始取(0开始),取几条
    attributes: ['htcode', 'name', 'status','role']
  }).then(function(units){
    res.render('units/units_all', { 
      title: '行政单元' ,
      pagesHTML: pagesHTML,
      units: units,
      total: pages,
      curPage: currentPage,
      sess: req.session
    });
  }).catch(function(err) {
    req.flash(err);
  });
  
});

//下面是针对/users/new路径的get方法请求，
//new动作
router.get('/new', function(req, res) {
  //res.render('/unit_new', { title: '创建行政单元' });
  res.render('units/units_new', {
    title: '创建行政单元',
    sess: req.session
  });
  
 
});

//下面是针对/users路径的post方法请求
//create动作
router.post('/', function(req, res) {
  // res.send('这里应处理new表单提交的数据，然后创建新纪录');
  //var name = req.body.name;
  //var password = req.body.password;
});

//下面是针对/users/:id路径的get方法请求，
//show动作
router.get('/:id', function(req, res) {
  Unit.findOne({
    where:{ id: req.params.id },
    attributes:['htcode','name','status','role']
  }).then(function(unit) {
    res.render('units/units_show', {
      title: '详细内容显示',
      unit: unit,
      sess: req.session
    });
  }).catch(function(err) {
    console.log(err);
  });
});  
//   res.send('这里应获取units表ID为'+req.params.id+'的记录');


//下面是针对/users/:id/edit路径的get方法请求
//edit动作
router.get('/:id/edit', function(req, res) {
  var id = req.params.id;
  Unit.findOne({
    where: {id: id},
    attributes: ['htcode', 'name', 'status','role']
  }).then(function(unit) {
    if (unit) {
      unit_values = unit.dataValues;
      res.render('units/units_edit', { 
        title: '编辑行政单元', 
        unit: unit_values,
        sess: req.session
      });
      //res.send(unit.dataValues);
      //console.log(r.dataValues);
      //console.log(JSON.stringify(unit));
    } else {
      req.flash("账号有错误！");
      req.redirect('back');
      //console.log("账号有错误！");
    }
  });
  //res.render('unit_edit', { title: '编辑行政单元' });
  //res.send('这里应获取编辑表单，编辑ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var values = new Object();
  values = req.body;
  Unit.update(
       values,
       {
       where:{id: id}
   }).then(function(r){
       res.redirect('/:' + req.params.id);
   }).catch(function(err){
      req.flash("修改失败！");
      //req.flash("账号不能为空！");
      res.redirect('back');
   });
  //res.send('这里应处理编辑表单提交的数据，然后更新ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  if(confirm('确定删除？')==true){
    Unit.destroy({
      where:{id : req.params.id}
    }).catch(function(err){
    console.log(err);
    });
  }else{}
});
 // res.send('这里应处理删除请求，删除ID为'+req.params.id+'的记录');
module.exports = router;