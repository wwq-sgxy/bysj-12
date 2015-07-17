var tables = require('../../models/tabled.js'); //加载模型定义
var User = tables.User;   //行政单元表模型

exports.testUser = function(test) {
  //有效数据
  var testdData = [ 
    {
      numid: '12115011033', 
      name: '吴国豪', 
      pass: '123456',
      unitId: 11,
      astatus: '审核中',
      cidset: []
    },
    {
      numid: "54342", 
      name: '李业富', 
      pass: '12356',
      unitId: 11,
      astatus: '审核中',
      cidset: []
    },
    {
      numid: '001460', 
      name: 'wwq', 
      pass: '123456',
      unitId: 11,
      astatus: '审核中',
      cidset: []
    }
  ];

  //有效数据测试
  testdData.forEach(function(data) {
    var user = User.build(data);
    //console.log(JSON.stringify(user));
    user.validate({
      skip: ['name','pass','unitId','astatus','cidset']
    }).then(function(err) {
      test.ok(!err, data.name + '测试失败！');
      if (typeof(err) !== undefined) {
        console.log(JSON.stringify(err));
      }
    });  
  });
  
  test.done();
};