var tables = require('../../models/tabled.js'); //加载模型定义
var Student = tables.Student;   //行政单元表模型

exports.testUser = function(test) {
  //有效数据
  var testdData = [ 
    {
      numid: '12115011033', 
      name: '吴国豪', 
      pass: '123456',
      astatus: '审核中',
      cidset: []
    },
    {
      numid: "12115011034", 
      name: '李业富', 
      pass: '12356',
      astatus: '审核中',
      cidset: []
    },
    {
      numid: "12115011035", 
      name: '王为群', 
      pass: '123456',
      astatus: '已审核',
      cidset: []
    }
  ];

  //有效数据测试
  testdData.forEach(function(data) {
    var user = Student.build(data);
    //console.log(JSON.stringify(user));
    user.validate({
      skip: ['numid','pass','name','cidset']
    }).then(function(err) {
      test.ok(!err, data.name + '测试失败！' + data.name.length);
      if (typeof(err) !== undefined) {
        console.log(JSON.stringify(err));
      }
    });  
  });
  
  test.done();
};