var tables = require('../models/tabled.js'),
    crypto = require('crypto'),
    hmac = crypto.createHmac('sha1', '650827');

var Student = tables.Student,
    UnitStu = tables.UnitStu;

var pass = hmac.update('123456').digest('hex');

Student.sync({force: true}).then(function () {
  // Table createdgit 
  UnitStu.findOne({ 
    where: {id : 4}
  }).then(function(unit){
    unit.createStudent({
      numid: '12115021033', 
      name: '吴晓灵', 
      pass: pass
    });
    unit.createStudent({
      numid: '12115021044', 
      name: '黄羡雯', 
      pass: pass
    });
  });
  
  UnitStu.findOne({ 
    where: {id : 30}
  }).then(function(unit){
    unit.createStudent({
      numid: '12115011033', 
      name: '吴国豪', 
      pass: pass
    });
    unit.createStudent({
      numid: '12115011044', 
      name: '李业富', 
      pass: pass
    });
  });
});
/*
Student.findAll({ include: [{
    model: UnitStu, as: 'Unit',
    attributes: ['name']
  }]
}).then(function(students) {
  students.forEach(function(stu) {
    console.log(JSON.stringify(stu));
  });
});
*/
