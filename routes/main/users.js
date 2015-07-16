var express = require('express');
var router = express.Router();
var tables = require('../../models/tabled.js'); //加载模型定义
var cs = require('../../models/share.js');      //加载共享函数
var crypto = require('crypto'),
    hmac = crypto.createHmac('sha1', '650827');

var User = tables.User;   //用户表模型
var Unit = tables.Unit;   //行政单元模型
/* 应该在这里实现users表的RESTful操作 */
//下面是针对/users路径的get方法请求
//index动作
router.get('/', function(req, res) {
  User.findAll({
    order: 'numid ASC ',
    attributes: ['id','numid','name','astatus']
  }).then(function(users){
    res.render('users/users_all', { 
      title: '用户表' ,
      users: users,
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
      user = User.build({});

  if(typeof(req.query.role) !== 'undefined' && req.query.role === 'tea') {
    role = 'tea';
  }

  res.render('users/users_new', {
    title: '用户注册',
    sess: req.session,
    role: role,
    user: user
  });
});

//下面是针对/users路径的post方法请求
//create动作
router.post('/', function(req, res) {
  //req.flash(JSON.stringify(req.body));
  //res.redirect('back');
  var htcode = req.body.htcode;
  
  User.findOne({ where : { numid: req.body.numid } })
  .then(function(user) {
    if (user) {
      req.flash("warning", "此学号已注册！");
      res.redirect('back');
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
          User.create({
            numid: req.body.numid,
            name: req.body.name,
            pass: req.body.pass,
            unitId: unit.id
          }).then(function(user) {
            if (user) {
              req.flash("success", "注册成功！");
              res.redirect('back');
            } else {
              req.flash("info", "注册失败！");
              res.redirect('back');
            }
          }).catch(function(err){
            req.flash("info", err.errors[0].path);
            res.redirect('back');
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
*/
  
});

//下面是针对/users/:id路径的get方法请求，
//show动作
router.get('/:id', function(req, res) {
  //res.send('这里应获取users表ID为'+req.params.id+'的记录');
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
  var id=req.params.id,
      role;
  User.findOne({
    where:{id:id},
    attributes:['id','numid','name','pass','unitid','astatus','cidset']
  }).then(function(user){
    if(!user){
      res.render('tips',{
        info:"不存在这样的记录！"
      });
    }
    //role = (user.numid.length == 11)? "stu":"tea";
    if(user.numid.length == 7) {role="admin";}
    else if(user.numid.length == 11) {role = "stu";}
    else {role = "tea"}
    res.render('users/users_edit',{
      title:'编辑用户表单',
      user:user,
      sess:req.session,
      role:role
    });
  });
  //res.send('这里应获取编辑表单，编辑ID为'+req.params.id+'的记录');
});

//下面是针对/users/:id路径的put或patch方法请求，
//update动作
router.put('/:id', function(req, res) {
  var id=req.params.id,
      name=req.body.name,
      numid=req.body.numid,
      pass=req.body.pass,
      unitid=req.body.unitid,
      astatus=( req.body.astatus == "01")? "已审核":"未审核",
      cidset=req.body.cidset;
      
      User.findOne({
        where:{numid:numid}
      }).then(function(user){
        if (user && user.id != id) {
      req.flash("此单元编码已存在！");
      res.redirect('back');
    }
        else{
          User.update(
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
          }).then(function(user){
            req.flash("更新成功!");
            res.redirect('/users/'+id);
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