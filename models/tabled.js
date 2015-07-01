//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./dbc.js');

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

//定义User模型
var User = db.sequelize.define('user', 
  {
    numid: {
      type: Sequelize.STRING,
      unique: true
      //validate: {
      //  is: /^\d{12}$/
      //}
    },
    name: Sequelize.STRING,
    pass: Sequelize.CHAR(40),
    unitid: {
      type: Sequelize.INTEGER,
      references: {
        model: Unit,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    astatus: {
      type: Sequelize.STRING,
      defaultValue: '审核中'
    },
    cidset: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['numid']
      }
    ]
  }
);

//User.sync();    //User模型与数据库users表同步
//User.sync({force: true});
exports.Unit = Unit;
exports.User = User;