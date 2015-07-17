var Sequelize = require('sequelize');
var db = require('./test/dbc_for_test.js');

//定义课程模型
var Course = db.sequelize.define('course', {
  coursename: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  courseintro: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Name = db.sequelize.define('name', {
  name: {
    type: Sequelize.STRING
  }
});

var NameCourse = db.sequelize.define('name_has_course', {});

Name.belongsToMany(Course, {through: 'name_has_course'});
Course.belongsToMany(Name, {through: 'name_has_course'});
NameCourse.sync({force:true});

/*Course.create({
  coursename : 'PHP',
  courseintro : 'php简介'
}).then(function(course){
  Name.create({
    name: 'wu'
  }).then(function(name) {
      course.addName(name).then(function(){
        console.log('ok');
      });
  });
});*/
//Name.sync({force:true});
//Course.sync({force:true});
// //定义签到表模型
// var Sign = db.sequelize.define('sign', {
  
//   //考勤时段,格式为  XX周X-X节
//   interval:{
    
//   },
  
//   //考勤结果：迟到、请假、旷课等
//   result: {
//     /*type: Sequelize.CHAR(2),
//     allowNull: false,
//     validate: {
//       isIn: {
//         args: [['迟到','请假','旷课']]
//       }
//     }*/
//     type: Sequelize.ENUM,
//     values: ['迟到','请假','旷课']
//   },
  
//   //启用标志：控制考勤的开启和关闭
//   flag: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
//   }
// });


//导出模型
// exports.Course = Course;
// exports.Sign   = Sign;