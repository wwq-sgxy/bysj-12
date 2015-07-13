var Sequelize = require('sequelize');
var db = require('../models/dbc.js');
var Unit = require('../models/tabled.js').Unit;
console.log(typeof(Unit));

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


