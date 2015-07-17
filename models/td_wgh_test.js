//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./test/dbc_for_test.js');

var User = require('./tabled.js').User;
//定义课程模型
var Course = db.sequelize.define('course', {
  coursename: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: {
        args: [true],
        msg: '课程名不允许为空串'
      }
    }
  },
  courseintro: {
    type: Sequelize.TEXT
  }
});