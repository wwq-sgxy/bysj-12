//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./dbc.js');

//定义Unit模型
var Unit = db.sequelize.define('unit', {
  htcode: {
    type: Sequelize.STRING,
    allowNull : false,
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
    allowNull : false,
    validate: {
      /*notNull: {
        args: [true],
        msg: '请设置行政单元的对应名称'
      },*/
      /*notEmpty: {
        args: [true],
        msg: '行政单元的对应名称不能设置为空字符串'
      }*/
      is: {
        args: [/^([0-9\u4e00-\u9fa5]+\-?)+[\u4e00-\u9fa5]+$/],
        msg: '行政单元的对应名称格式需为中文数字加-，且需以中文开头结束'
      }
    }
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull : false,
    validate: {
      isIn: [[true, false]]
    },
    defaultValue: true
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['学生', '教职工']]
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
      allowNull : false,
      unique: true,
      validate: {
        is: {
          args: /(^\d{11}$)|(^\d{5}$)/,
          msg: '必须是5位或11位数字标识'
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false,
      //validate: {
      //  is: {
      //    args: [/^[\u4e00-\u9fa5]+$/],
      //    msg: '用户名格式需为中文'
      //  },
      //  len : {
      //    args : [[2,30]],
      //    msg : '用户名长度在2-15之间'
      //  }
      //}
    },
    pass: Sequelize.CHAR(40),
    //unitid: {
    //  type: Sequelize.INTEGER,
    //  allowNull : false,
    //  references: {
    //    model: Unit,
    //    key: 'id',
    //    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    //  }
    //},
    astatus: {
      type: Sequelize.STRING,
      allowNull : false,
      validate : {
        isIn : [['审核中','已审核']]
      },
      defaultValue: '审核中'
    },
    cidset: {
      allowNull : false,
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

//定义Role模型
var Role = db.sequelize.define('role',
  {
    roletype: {
      type: Sequelize.STRING,
      validate: {
        isIn: {
          args: [['系统维护','行政事务','社团事务']],
          msg: '用户角色类型错误!!!'
        }
      }
    },
    rolename: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: [/^[\u4e00-\u9fa5]+$/],
          msg: '角色名格式需为中文'
        }
      }
    },
    roleintro: {
      type: Sequelize.TEXT
    }
  },
  {
    comment: "角色表",  //表的说明注释
    indexes: [
      {
        unique: true,
        fields: ['rolename']
      }
    ],
    timestamps: true,
    //不要更新时间属性
    UpdatedAt: false,
  }
);

Unit.hasMany(User);
User.belongsTo(Unit);

//User.sync();    //User模型与数据库users表同步
//User.sync({force: true});

/*
//定义User_Info模型
var Info = db.sequelize.define('user_infos',
  {
    user_id:{
      type:Sequelize.STRING,
      allowNull:false,
      references:{
        model:User,
        key:'numid',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    
    nickname:{
      type:Sequelize.STRING(12)
    },
    
    email:{
      type:Sequelize.STRING,
      validate:{
        is:{
          args:[/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/],
          msg: '不是有效的电子邮件地址'
        }
      }
    },
    
    qq:{
      type:Sequelize.INTEGER
    },
    
    phone:{
      type:Sequelize.INTEGER(11)
    },
    
    sex:{
      type:Sequelize.STRING,
      validate: {
        isIn: {
          args: [['M','F']],
          msg: '性别必须是M或F !!!'
        }
      },
      defaultValue: 'M'
    },
    
    age:{
      type:Sequelize.INTEGER
    },
    
    gravatar:{
      type:Sequelize.STRING
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
*/  
exports.Unit = Unit;
exports.User = User;
exports.Role = Role;
//exports.Info = Info;