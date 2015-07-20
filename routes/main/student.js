var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数
var crypto = require('crypto'),
    hmac = crypto.createHmac('sha1', '650827');

var Student = tables.Student;     //学生表模型
var UnitStu = tables.UnitStu;     //学生单元模型

//下面是针对/students路径的get方法请求
//index动作
router.get('/', function(req, res) {
  var currentPage = 1,
      pageSize = 10,        //这里应该从配置文件取
      pagesHTML = '',       //要生成的分页器
      pages = 0;            //总页数

  if (typeof(req.query.s) !== 'undefined' && !isNaN(req.query.s)){
    currentPage = parseInt(req.query.s, 10); //将字符串转为数字
  }

  Student.count().then(function(total) {
    pages = (total > pageSize) ? Math.ceil(total/pageSize) : 1; //计算总页数
    pagesHTML = cs.makePager(total, currentPage, pageSize); //生成分页器
  }).catch(function(err){
    res.send(err);
  });

  Student.findAll({
    offset: (currentPage - 1 ) * pageSize,
    limit: pageSize,
    order: 'numid ASC',
    attributes: ['id', 'numid', 'name', 'astatus'],
    include: [{
      model: UnitStu, as: 'Unit',
      attributes: ['name']
    }]
  }).then(function(students) {
    res.render('students/all', { 
      title: '学生' ,
      pagesHTML: pagesHTML,
      students: students,
      total: pages,
      curPage: currentPage,
      sess: req.session
    });
  }).catch(function() {
    res.flash('info',"系统出错，稍后再试！");
    res.redirect('back');
  });
  
});

/*
//new动作
router.get('/new', function(req, res) {
  var student = { numid:"", name:"", pass:"", repass:"",
        collegeCode: 'xx',
        gradeCode: 'xxxx',
        majorCode: 'xx',
        stuclassCode: 'xx',
        htcode: '10576-01-01-xx-xxxx-xx-xx'
      };

  res.render('students/new', {
    title: '学生注册',
    sess: req.session,
    student: student
  });
});

//下面是针对/students路径的post方法请求
//create动作
router.post('/', function(req, res) {
  //req.flash(JSON.stringify(req.body));
  //res.redirect('back');
  var htcode = req.body.htcode;
  
  req.body.collegeCode = htcode.substr(12,2);
  req.body.gradeCode = htcode.substr(15,4);
  req.body.majorCode = htcode.substr(20,2);
  req.body.stuclassCode = htcode.substr(23,2);

  Student.findOne({ where : { numid: req.body.numid } })
  .then(function(student) {
    if (student) {
      req.flash("warning", "此学号已注册！");
      res.render('students/new', {
        title: '学生注册',
        sess: req.session,
        student: req.body
      });
    } else {
      Unit.findOne({ where : { htcode: htcode } })
      .then(function(unit) {
        if (!unit) {
          req.flash("warning", "不存在所选择的班级！");
          res.redirect('back');
        } else {
          //req.flash(JSON.stringify(req.body));
          //res.redirect('back');
          
          //req.body.unitId = unit.id;
          //req.body.pass = hmac.update(req.body.pass).digest('hex');
          Student.create({
            numid: req.body.numid,
            name: req.body.name,
            pass: req.body.pass,
            unitId: unit.id
          }).then(function(student) {
            if (student) {
              req.flash("success", "注册成功！");
              res.redirect('back');
            } else {
              req.flash("info", "注册失败！");
              res.redirect('back');
            }
          }).catch(function(err){
            for(var i=0; i<err.errors.length;i++) {
              req.flash(err.errors[i].path,err.errors[i].message);
            }

            res.render('students/new', {
              title: '学生注册',
              sess: req.session,
              student: req.body
            });
          });
        
        }
      });  
    }
    
  });

/* 
  Unit.findOrCreate({
    where : {
      htcode: htcode
    },
    defaults: {
      name: name
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
  //res.send('这里应获取users表ID为'+req.params.id+'的记录');
   Student.findOne({
    where:{ id: req.params.id }
  }).then(function(student) {
    if (!student) {
      res.render('tips', { 
        info: "不存在这样的记录！"
      });
    }
    student.createdTime = cs.dbTimeToLocaltime({
      dbtime: student.createdAt,
      tz: 8
    });
    student.updatedTime = cs.dbTimeToLocaltime({
      dbtime: student.updatedAt,
      tz: 8
    });
    res.render('students/show', {
      title: '详细内容显示',
      student: student,
      sess: req.session
    });
  }).catch(function(err) {
    console.log(err);
  });
}); 


//下面是针对/students/:id/edit路径的get方法请求
//edit动作
router.get('/:id/edit', function(req, res) {
  var id = req.params.id;
  Student.findOne({
    where:{id:id},
    attributes:['id','numid','name','pass','unitid','astatus','cidset']
  }).then(function(student){
    if(!student){
      res.render('tips',{
        info:"不存在这样的记录！"
      });
    }
    res.render('students/edit',{
      title:'编辑学生表单',
      student: student,
      sess:req.session
    });
  });
  //res.send('这里应获取编辑表单，编辑ID为'+req.params.id+'的记录');
});

//下面是针对/students/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  var id = req.params.id,
      name = req.body.name,
      numid = req.body.numid,
      pass = req.body.pass,
      unitid = req.body.unitid,
      astatus =(req.body.astatus == "01")? "已审核":"未审核",
      cidset = req.body.cidset;
      
      Student.findOne({
        where:{numid:numid}
      }).then(function(student){
        if (student && student.id != id) {
      req.flash("此学号已存在！");
      res.redirect('back');
    }
        else{
          Student.update(
          {
            numid:numid,
            name:name,
            pass:pass,
            unitid:unitid,
            astatus:astatus,
            cidset:cidset,
            updatedAt: new Date()
          }, {
            where:{id:id}
          }).then(function(student){
            req.flash("更新成功!");
            res.redirect('/students/'+id);
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

//下面是针对/students/:id路径的delete方法请求，
//delete动作
router.delete('/:id', function(req, res) {
  //res.send('这里应处理删除请求，删除ID为'+req.params.id+'的记录');
  var id = req.params.id;

  Student.destroy({
    where:{id : id}
  }).then(function(ret) {
    if (ret) {
      req.flash("删除成功！");
      res.redirect('/students');  
    } else {
      req.flash("找不到要删除的记录！");
      res.redirect('back');
    }
  }).catch(function(){
    req.flash("系统错误！请稍后再试");
    res.redirect('back');
  });
});
*/
module.exports = router;