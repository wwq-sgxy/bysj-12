//此文件用于定义数据库模型并同步到数据库
//表单参数的验证在定义时完成
var Sequelize = require('sequelize');
var db = require('../models/dbc_for_test.js');



// var Unit = db.sequelize.define('unit', {
//   htcode: {
//     type: Sequelize.STRING,
//     allowNull : false,
//     unique: true,
//     validate: {
//       is: {
//         args: [/^([0-9]+\-)*[0-9]+$/],
//         msg: '行政单元的层次类别码格式错误'
//       }
//     }
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull : false,
//     validate: {
//       /*notNull: {
//         args: [true],
//         msg: '请设置行政单元的对应名称'
//       },*/
//       /*notEmpty: {
//         args: [true],
//         msg: '行政单元的对应名称不能设置为空字符串'
//       }*/
//       is: {
//         args: [/^([0-9\u4e00-\u9fa5]+\-?)+[\u4e00-\u9fa5]+$/],
//         msg: '行政单元的对应名称格式需为中文数字加-，且需以中文开头结束'
//       }
//     }
//   },
//   status: {
//     type: Sequelize.BOOLEAN,
//     allowNull : false,
//     validate: {
//       isIn: [[true, false]]
//     },
//     defaultValue: true
//   },
//   role: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['学生', '教职工']]
//     }
//   }
//   },
//   {
//     indexes: [
//       {
//         unique: true,
//         fields: ['htcode']
//       }
//     ]
//   }
// );

//定义User模型
var User = db.sequelize.define('user', 
  {
    numid: {
      type: Sequelize.STRING,
      allowNull : false,
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
      allowNull : false,
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

// var UserRole = db.sequelize.define('userRole',{});
// // Unit.hasMany(User);
// // User.belongsTo(Unit);
// User.belongsToMany(Role, { through: 'UserRole'});
// Role.belongsToMany(User, { through: 'UserRole'});


// //Unit.sync({force: true});
// User.sync({force: true});
// Role.sync({force: true});
// UserRole.sync({force: true});



var Client = db.sequelize.define('client', {
    title: {
      type: Sequelize.STRING(200),
      allowNull: false
    }
  },{
    paranoid: true,
    underscored: true,
    classMethods: {
      associate:function(models){
          Client.hasMany(models.rule, { through: 'client_rules', onDelete: 'cascade'});
      }
    }
  });


var Rule = db.sequelize.define('rule', {
  
    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  
  },{
    underscored: true,
    paranoid: true,
    classMethods: {
      associate:function(models){
          Rule.belongsToMany(models.client, { through: 'client_rules', onDelete: 'cascade'});
          Rule.belongsTo(models.service, { foreignKey: 'service_id' } );
      }
    }
  });

// Client.sync({force:true});
// Rule.sync({force:true});



/*var Sequelize = require('sequelize');
var db = require('../models/dbc_for_test.js');
var Role = require('../models/tabled.js').Role;
var cs = require('../models/share.js'); 
Role.findAndCountAll({
    
}).then(function(result) {
  
  console.log(result.count);
});
*/
/*Role.sync({
  force : true
}).then(function(){
  return Role.create({
    'rolename': '学生',
    'roletype': '行政事务',
    'roleintro': '学生角色简介'
  });
});
*/

/*var Unit = require('../models/tabled.js').Unit;
console.log(typeof(Unit));
*/


/** ========设置虚拟属性例子  ======== **/
/*var Foo = db.sequelize.define('Foo', {
  firstname: {
    type: Sequelize.STRING,
    get : function (){
      return this.getDataValue('firstname') + '(国豪)';
    }
  },
  lastname: Sequelize.STRING
}, {
  //获取虚拟属性fullname
  getterMethods   : {
    fullName       : function()  { return this.firstname + ' ' + this.lastname }
  },
  //设置虚拟属性fullname
  setterMethods   : {
    fullName       : function(value) {
        var names = value.split(' ');
        //改变firstname和lastname的值
        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
});

Foo.sync().then(function () {
  return Foo.create({
    firstname: 'guohao', 
    lastname: 'wu', 
  }).then( function(foo){
    console.log('1：' + foo.fullName);
    console.log('2：' + foo.firstname);
    console.log('3：' + foo.get('fullName'));
    //获firstname的原始值
    console.log('4：' + foo.getDataValue('firstname'));
    //设置firstname
    foo.setDataValue('firstname','吴国豪 wuguohao');
    console.log('5：' + foo.firstname);
    foo.set('fullName','wuguohao 1234');
    console.log('6：' + foo.firstname);
  }).catch(function(err){
    console.log(err);
  }); 
});*/
/** ========设置虚拟属性例子结束  ======== **/

/** ========模型和它的实例添加自定义函数  ======== **/
//var Foo = db.sequelize.define('Foo', { /* attributes */}, {
/*  classMethods: {
    method1: function(){ return 'smth' }
  },
  instanceMethods: {
    method2: function() { return 'foo' }
  }
});

console.log(Foo.method1());
console.log(Foo.build().method2());
*/
/** ========模型和它的实例添加自定义函数结束  ======== **/

/*var Yonghu = db.sequelize.define('User', { name: Sequelize.STRING })
  , Task = db.sequelize.define('Task', { name: Sequelize.STRING });

Task.belongsTo(Yonghu);*/
//Yonghu.hasMany(Task);
//Yonghu.hasMany(Tool, { as: 'Instruments' });

//db.sequelize.sync();

/*Yonghu.create({
  name: 'guohao',
}).then( function(result){
 // console.log(result);
}).catch(function (err){
    console.log(err);
});

Task.create({
  name: '国豪',
}).then( function(result){
  //console.log(result);
}).catch(function (err){
    console.log(err);
});*/

/*Task.findAll({ include: [ Yonghu ] }).then(function(tasks) {
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(JSON.stringify(tasks));
});*/
/*Unit.sync().then(function () {
  return Unit.create({
    htcode: '10576-1223', 
    name: '测试管理员', 
    status: true,
    role: '测试管理员'
  }).then( function(result){
    console.log(result);
  }).catch(function(err){
    console.log(err);
  }); 
});


var htcode='10576-02-01-05-05', 
    name='韶关学院-教学机构-信息科学与工程学院-通信工程系', 
    status= true,
    role= '老师';
debugger;
Unit.findOrCreate({
  where : {
    htcode: htcode, 
    name: name, 
    status: status,
    role: role
  }
  }).spread(function(unit,created){
    console.log(created);
});
*/


/*Unit.create({
  htcode: '10576-1112', 
  name: '测试管理员', 
  status: true,
  role: '测试管理员'
}).then(function(){
  Unit.findOrCreate({
    where: {
      htcode: '10576-1112'
    }
  }).spread(function(unit,created){
    console.log(created);
  });
});

Unit.findAll({
  
}).then(function(result){
  console.log(JSON.stringify(result));
}).catch(function(err){
  console.log(err);
})*/


