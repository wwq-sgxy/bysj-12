//此文件用于定义User模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var sequelize = require('./dbc.js');

//定义User模型
var User = sequelize.define('User', {
  stunum: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

User.sync();    //User模型与数据库users表同步

exports = User;