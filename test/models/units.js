var tables = require('../../models/tabled.js'); //加载模型定义
var Unit = tables.Unit;   //行政单元表模型

exports.testRole = function(test) {
  //有效数据
  var validData = [ 
    { role: '教职工' }, 
    { role: '学生' },
    { status: true },
    { status: false }
  ];
  //无效数据
  var invalidData = [ 
    { role: '无效角色' }, 
    { role: 'ppp' },
    { status: 12 },
    { status: "fds" },
  ];
  //有效数据测试
  validData.forEach(function(data) {
    Unit.build(data).validate().then(function(err) {
      test.ok(!err, '测试失败，验证器不正常！');
    });  
  });
  
  //无效数据测试
  invalidData.forEach(function(data) {
    Unit.build(data).validate().then(function(err) {
      test.ok(err, '测试失败，验证器不正常！');
    });  
  });
  
  test.done();
};