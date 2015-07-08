var Sequelize = require('sequelize');
var Unit = require('../models/tabled.js').Unit;

var htcode = '10576-99';
var unit = new Object();
Unit.findOne({
    where: {htcode: htcode},
    attributes: ['htcode', 'name', 'role']
  }).then(function(r) {
    if (r) {
      //console.log(r);
      //for(var i = 0; i < r.length; i++){
          console.log(JSON.stringify(r));
      //}
    } else {
      //req.flash("账号不存在或与密码不匹配！");
      console.log("账号有错误！");
    }
  }).catch(function(err){
      console.log(err);
  });
  /*var data = new Object();
  data.htcode='10576-99';
  data.name = '系统管理组';
  data.role = '管理员';
  data.status = false;
 Unit.update(
     data,
     {
         attributes: ['htcode', 'name', 'role','status'],
         where:{htcode: htcode}
 }).then(function(r){
     Unit.findOne({
        where: {htcode: htcode},
        //attributes: ['htcode', 'name', 'role']
      }).then(function(r) {
        if (r) {
            unit = r;
          console.log(unit.dataValues);
        } else {
          //req.flash("账号不存在或与密码不匹配！");
          console.log("账号有错误！");
        }
      });
 }).catch(function(err){
     console.log(err);
 });*/