var tables = require('../../models/tabled.js'); //加载模型定义
var Role = tables.Role;   //行政单元表模型

exports.testRole = function(test) {
  //有效数据
  var validData = [ 
    { roletype: '行政事务' }, 
    { rolename: '学生' }
  ];
  //无效数据
  var invalidData = [ 
    { roletype: '测试' }, 
    { roletype: 'aa' }, 
    { rolename: 'aa' }
  ];
  //有效数据测试
  validData.forEach(function(data) {
    Role.build(data).validate().then(function(err) {
      test.ok(!err, '测试失败，验证器不正常2！');
    });  
  });
  
  //无效数据测试
  invalidData.forEach(function(data) {
    Role.build(data).validate().then(function(err) {
      test.ok(err, '测试失败，验证器不正常1！');
      console.log(err);
    });  
  });
  
  test.done();
};