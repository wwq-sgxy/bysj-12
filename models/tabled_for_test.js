//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./dbc_for_test.js');

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
      //is: {
      //  args: [/^([0-9\u4e00-\u9fa5]+\-)*[\u4e00-\u9fa5]+$/],
      //  msg: '行政单元的对应名称格式需为中文加-，且需以中文开头结束'
      //}
    }
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: Sequelize.STRING,
    validate: {
      isIn: {
        args: [['学生', '教职工']],
        msg: "角色必须是【学生】或【教职工】"
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
      unique: true,
      validate: {
        is: {
          args: [/^\d{5}(\d{7})?$/],
          msg: '用户标识号格式错误，需为5位或12位标识号'
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: [/^[\u4e00-\u9fa5]+$/],
          msg: '用户名格式需为中文'
        },
        len : {
          args : [[2,15]],
          msg : '用户名长度在2-15之间'
        }
      }
    },
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
      validate : {
        isIn : [['审核中','已审核']]
      },
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