var tables = require('../../models/tabled.js'); //加载模型定义
var Unit = tables.Unit;   //行政单元表模型

exports.testRole = function(test) {
  //有效数据
  var validData = [ 
    { htcode: '10576-01-01-05-2012-01-01', name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', role: '教职工'}, 
   /* { role: '学生' },
    { status: true },
    { status: false },
    { name: "韶关学院" }*/
    //{ name: null}
   // { role: null }
  ];
  //无效数据
  var invalidData = [ 
    { htcode: 'a', name: '韶关学院-信息科学与工程学院-2012级', role: '教职工'},
    { htcode: '', name: '韶关学院-信息科学与工程学院-2012级', role: '教职工'},
    { htcode: null, name: '韶关学院-信息科学与工程学院-2012级', role: '教职工'},
    { htcode: '10576-01-01-05-2012-01-01', name: '', role: '教职工'},
    { htcode: '10576-01-01-05-2012-01-01', name: 'assdd', role: '教职工'},
    { htcode: '10576-01-01-05-2012-01-01', name: null, role: '教职工'},
    { htcode: '10576-01-01-05-2012-01-01', name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', role: '呵呵'},
    { htcode: '10576-01-01-05-2012-01-01', name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', role: ''}, 
    { htcode: '10576-01-01-05-2012-01-01', name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', role: null},
    { htcode: '10576-01-01-05-2012-01-01', name: '韶关学院-信息科学与工程学院-2012级-计算机科学技术专业-1班', role: '教职工', status : null},
    //{ role: '无效角色' }, 
    /*{ role: 'ppp' },
    { status: 12 },
    { status: "fds" },
    { name: null },*/
    //{ role: null }
  ];
  //有效数据测试
  validData.forEach(function(data) {
    Unit.build(data).validate().then(function(err) {
      test.ok(!err, '测试失败，验证器不正常1！');
     // console.log(err);
    });  
  });
  
  //无效数据测试
  invalidData.forEach(function(data) {
    Unit.build(data).validate().then(function(err) {
      test.ok(err, '测试失败，验证器不正常2！');
      // console.log(err);
      // console.log(' ');
    });  
  });
  
  test.done();
};