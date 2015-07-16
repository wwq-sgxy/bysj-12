var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数

var Unit = tables.Unit;   //行政单元表模型
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

  Unit.count().then(function(total) {
    pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1; //计算总页数
    pagesHTML = cs.makePager(total, currentPage, pageSize); //生成分页器
    //currentPage = (currentPage <= 0 || currentPage > pages) ? 1 : currentPage;
  }).catch(function(err){
    res.send(err);
  });

  Unit.findAll({
    offset: (currentPage - 1 ) * pageSize,
    limit: pageSize,
    order: 'htcode ASC',
    attributes: ['id', 'htcode', 'name', 'status','role']
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
  var role = 'stu',
      unit = Unit.build({});
  
  if(typeof(req.query.role) !== 'undefined' && req.query.role === 'tea') {
    role = 'tea';
  }

  res.render('units/units_new', {
    title: '创建行政单元',
    sess: req.session,
    role: role,
    unit: unit
  });
});

//下面是针对/users路径的post方法请求
//create动作
router.post('/', function(req, res) {
  var htcode = req.body.htcode,
      name = req.body.name,
      role = req.body.role,
      status = req.body.status;
 
  Unit.findOrCreate({
    where : {
      htcode: htcode
    },
    defaults: {
      name: name,
      role: role,
      status: status
    }
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

//下面是针对/users/:id路径的get方法请求，
//show动作
router.get('/:id', function(req, res) {
  Unit.findOne({
    where:{ id: req.params.id }
    //attributes:['htcode','name','status','role']
  }).then(function(unit) {
    if (!unit) {
      res.render('tips', { 
        info: "不存在这样的记录！"
      });
    }
    unit.createdTime = cs.dbTimeToLocaltime({
      dbtime: unit.createdAt,
      tz: 8
    });
    unit.updatedTime = cs.dbTimeToLocaltime({
      dbtime: unit.updatedAt,
      tz: 8
    });
    res.render('units/units_show', {
      title: '详细内容显示',
      unit: unit,
      sess: req.session
    });
  }).catch(function(err) {
    console.log(err);
  });
});  
//下面是针对/users/:id/edit路径的get方法请求
//edit动作
router.get('/:id/edit', function(req, res) {
  var role,
      id = req.params.id;

  Unit.findOne({
    where: {id: id},
    attributes: ['id', 'htcode', 'name', 'status']
  }).then(function(unit) {
    if (!unit) {
      res.render('tips', { 
        info: "不存在这样的记录！"
      });
    }
    role = (unit.htcode.substr(6,2) == "01") ? "stu" : "tea"; 
    res.render('units/units_edit', { 
        title: '编辑行政单元', 
        unit: unit,
        sess: req.session,
        role: role
    });
  });
});

//下面是针对/users/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  var htcode = req.body.htcode,
      name = req.body.name,
      status = (req.body.status == "01")? "true" : "false",
      id = req.params.id;

  Unit.findOne({
    where: {htcode: htcode}
  }).then(function(unit) {
    if (unit && unit.id != id) {
      req.flash("此单元编码已存在！");
      res.redirect('back');
    } else {
      Unit.update({
        htcode: htcode,
        name: name,
        status: status,
        updatedAt: new Date()
      }, {
        where: {id: id} 
      }).then(function(r){
        req.flash("更新成功！");
        res.redirect('/units/' + id);
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

//下面是针对/users/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Unit.destroy({
    where:{id : id}
  }).then(function(ret) {
    if (ret) {
      req.flash("删除成功！");
      res.redirect('/units');  
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