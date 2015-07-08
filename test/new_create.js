var Sequelize = require('sequelize');
var db = require('../models/dbc.js');
var Unit = require('../models/tabled.js').Unit;
var Unitinfo = require('../config/units_metadata.js');
var unitinfo = new Unitinfo();


console.log(unitinfo.root);



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
});*/







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


