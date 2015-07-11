var Sequelize = require('sequelize');
var tables = require('../models/tabled.js');

var Unit = tables.Unit;
var htcode = '10576-01-01-05-2012-01-01';
Unit.findOne({
    where:{htcode:htcode},
   // attributes:['htcode','name','status','role']
}).then(function(unit){
    //console.log(unit.htcode+unit.name+unit.status+unit.role);
    console.log(unit);
}).catch(function(err){
  console.log(err);
});


// Unit.destroy({
//     where:{htcode:htcode}
//     }).then(function(unit){
//          console.log('success!');
//     }).catch(function(err){
//   console.log(err);
//  });


