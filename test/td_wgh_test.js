//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('../models/dbc_for_test.js');

//定义签到表模型
var Sign = db.sequelize.define('sign', {
  
  //考勤时段,格式为  XX周X-X节
//   interval:{
    
//   },
  
  //考勤结果：迟到、请假、旷课等
  result: {
    /*type: Sequelize.CHAR(2),
    allowNull: false,
    validate: {
      isIn: {
        args: [['迟到','请假','旷课']]
      }
    }*/
    type: Sequelize.ENUM,
    values: ['迟到','请假','旷课']
  },
  
  //启用标志：控制考勤的开启和关闭
  flag: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

Sign.sync();