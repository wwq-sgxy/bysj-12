//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./dbc.js');

//定义Unit模型
var Unit = db.sequelize.define('unit', {
  htcode: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      is: {
        args: [/^([0-9]+\-)*[0-9]+$/],
        msg: '行政单元的层次类别码格式错误'
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      /*notNull: {
        args: [true],
        msg: '请设置行政单元的对应名称'
      },
      notEmpty: {
        args: [true],
        msg: '行政单元的对应名称不能设置为空字符串'
      }*/
      is: {
        args: [/^([0-9\u4e00-\u9fa5]+\-)*[\u4e00-\u9fa5]+$/],
        msg: '行政单元的对应名称格式需为中文加-，且需以中文开头结束'
      }
    }
  },
  status: {
    type: Sequelize.BOOLEAN,
    /*validate: {
      isIn: {
        args: [[true, false]],
        msg:  'status只能为true或false'
      }
    }*/
    defaultValue: true
  },
  role: {
    type: Sequelize.STRING,
    validate: {
      is: {
        args: [/^[\u4e00-\u9fa5]+$/],
        msg: '角色名称格式需为中文'
      }
    }
  }
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