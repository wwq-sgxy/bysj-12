//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('./dbc.js');

//定义UnitStu模型(学生单元)
var UnitStu = db.sequelize.define('unitstu', 
  {
    htcode: {
      type: Sequelize.STRING,
      allowNull : false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull : false,
      defaultValue: true
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

//定义UnitTea模型(教职工单元)
var UnitTea = db.sequelize.define('unittea', 
  {
    htcode: {
      type: Sequelize.STRING,
      allowNull : false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull : false,
      defaultValue: true
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

//定义Student模型
var Student = db.sequelize.define('student', 
  {
    numid: {
      type: Sequelize.STRING,
      allowNull : false,
      unique: true,
      validate: {
        is: {
          args: /^\d{11}$/,
          msg: '学号必须是11位数字！'
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false,
      validate: {
        is: {
          args: [/^[\u4e00-\u9fa5]+$/],
          msg: '姓名必须用中文输入！'
        },
        len : {
          args : [2,5],
          msg : '姓名长度必须在2-5之间'
        }
      }
    },
    pass: Sequelize.CHAR(40),
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

//定义Teacher模型
var Teacher = db.sequelize.define('teacher', 
  {
    numid: {
      type: Sequelize.STRING,
      allowNull : false,
      unique: true,
      validate: {
        is: {
          args: /^\d{5}$/,
          msg: '教职工号必须是5位数字！'
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false,
      validate: {
        is: {
          args: [/^[\u4e00-\u9fa5]+$/],
          msg: '姓名必须用中文输入！'
        },
        len : {
          args : [2,5],
          msg : '姓名长度必须在2-5之间'
        }
      }
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

//User.sync();    //User模型与数据库users表同步
//User.sync({force: true});
//UnitStu.sync({force: true});
//UnitTea.sync({force: true});
//Student.sync({force: true});
//Teacher.sync({force: true});

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
      type:Sequelize.CHAR,
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

UnitStu.hasMany(Student, {as: 'Student', foreignKey: 'unitId'});
Student.belongsTo(UnitStu, {as: 'Unit', foreignKey: 'unitId'});
//UnitTea.hasMany(Teacher);
//Teacher.belongsTo(UnitTea);

exports.UnitStu = UnitStu;
exports.UnitTea = UnitTea;
exports.Student = Student;
exports.Teacher = Teacher;
exports.Role = Role;
//exports.Info = Info;