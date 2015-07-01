var Sequelize = require('sequelize');
var db = require('../models/dbc.js');

//定义Unit模型
var Unit = db.sequelize.define('unit', {
  htcode: {
    type: Sequelize.STRING,
    unique: true
  },
  name: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  role: Sequelize.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['htcode']
      }
    ]
  }

);

Unit.sync({force: true}).then(function () {
  // Table created
  return Unit.bulkCreate([
    {
      htcode: '10576-99', 
      name: '系统管理组', 
      status: true,
      role: '管理员'
    },
    {
      htcode: '10576-01-05-02-04', 
      name: '韶关学院-信息科学与工程学院-计算机科学技术系', 
      status: true,
      role: '教师'
    },
    {
      htcode: '10576-01-05-01-2012-01-01', 
      name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', 
      status: true,
      role: '学生'
    },
    {
      htcode: '10576-01-05-01-2012-01-02', 
      name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-2班', 
      status: true,
      role: '学生'
    }
  ]);
});
