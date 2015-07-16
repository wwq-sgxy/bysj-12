var Sequelize = require('sequelize');
var tables = require('../models/tabled.js');

var User = tables.User;
var id='sysadm2';
var role;
User.findAll(
  {
    order: 'numid ASC ',
    //where:{numid:id},
    //attributes: ['numid', 'name', 'pass']
  }).then(function(users){
    console.log(users);
}).catch(function(err){
  console.log(err);
});

      //role;
  /*User.findOne({
    where:{numid:id},
    attributes:['id','numid','name','pass','unitid','astatus','cidset']
  }).then(function(user){
    
    role=(user.numid.length == 7)? 'tea':'stu';
    console.log(role);
    
  });*/



  

