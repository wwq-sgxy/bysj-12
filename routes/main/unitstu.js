var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数

var UnitStu = tables.UnitStu;   //行政单元表模型

//index动作
router.get('/', function(req, res) {
  var currentPage = 1,
      pageSize = 10,        //这里应该从配置文件取
      pagesHTML = '',       //要生成的分页器
      pages = 0;            //总页数

  if (typeof(req.query.s) !== 'undefined' && !isNaN(req.query.s)){
    currentPage = parseInt(req.query.s, 10); //将字符串转为数字
  }

  UnitStu.count().then(function(total) {
    pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1; //计算总页数
    pagesHTML = cs.makePager(total, currentPage, pageSize); //生成分页器
  }).catch(function(err){
    res.send(err);
  });

  UnitStu.findAll({
    offset: (currentPage - 1 ) * pageSize,
    limit: pageSize,
    order: 'htcode ASC',
    attributes: ['id', 'htcode', 'name', 'status']
  }).then(function(units){
    res.render('unitstus/all', { 
      title: '学生单元' ,
      pagesHTML: pagesHTML,
      units: units,
      total: pages,
      curPage: currentPage,
      sess: req.session
    });
  }).catch(function() {
    res.flash('info',"系统出错，稍后再试！");
    res.redirect('back');
  });
  
});

//new动作
router.get('/new', function(req, res) {
  var unit = UnitStu.build({});
  
  res.render('unitstus/new', {
    title: '创建学生单元',
    sess: req.session,
    unit: unit
  });
});

//create动作(利用Ajax交换)
router.post('/', function(req, res) {
  UnitStu.findOrCreate({
      where : { htcode: req.body.htcode },
      defaults: req.body
  }).spread(function(unit,created){
    if (created) {
      res.send({dStyle: 'alert-success', msg: '创建成功！'});
    }else{
      res.send({dStyle: 'alert-warning', msg: '此单元已存在！'});
    }
  }).catch(function() {
    res.send({dStyle: 'alert-info', msg: '系统出错！稍后再试'});
  });
});


//show动作
router.get('/:id', function(req, res) {
  UnitStu.findOne({
    where:{ id: req.params.id }
  }).then(function(unit) {
    if (!unit) {
      res.flash('info',"不存在这样的记录！");
      res.redirect('back');
    }
    unit.createdTime = cs.dbTimeToLocaltime({
      dbtime: unit.createdAt,
      tz: 8
    });
    unit.updatedTime = cs.dbTimeToLocaltime({
      dbtime: unit.updatedAt,
      tz: 8
    });
    res.render('unitstus/show', {
      title: '学生单元详细信息',
      unit: unit,
      sess: req.session
    });
  }).catch(function() {
    res.flash('info',"系统出错，稍后再试！");
    res.redirect('back');
  });
});  

//edit动作
router.get('/:id/edit', function(req, res) {
  UnitStu.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'htcode', 'name', 'status']
  }).then(function(unit) {
    if (!unit) {
      res.flash('info',"不存在这样的记录！");
      res.redirect('back');
    }
    res.render('unitstus/edit', { 
      title: '编辑学生单元', 
      unit: unit,
      sess: req.session
    });
  }).catch(function() {
    res.flash('info',"系统出错，稍后再试！");
    res.redirect('back');
  });
});

//update动作
router.put('/:id', function(req, res) {
  var htcode = req.body.htcode,
      name = req.body.name,
      status = (req.body.status == "01")? "true" : "false",
      id = req.params.id;

  UnitStu.findOne({
    where: {htcode: htcode}
  }).then(function(unit) {
    if (unit && unit.id != id) {
      req.flash("此单元编码已存在！");
      res.redirect('back');
    } else {
      UnitStu.update({
        htcode: htcode,
        name: name,
        status: status,
        updatedAt: new Date()
      }, {
        where: {id: id} 
      }).then(function(r){
        req.flash("更新成功！");
        res.redirect('/unitstus');
      }).catch(function(){
          req.flash("更新失败！");
          res.redirect('back');
      });
    }
  }).catch(function(){
    req.flash("系统错误操作失败！");
    res.redirect('back');
  });

});

//delete动作
router.delete('/:id', function(req, res) {
  UnitStu.destroy({
    where:{id : req.params.id}
  }).then(function(ret) {
    if (ret) {
      req.flash("删除成功！");
      res.redirect('/unitstus');  
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