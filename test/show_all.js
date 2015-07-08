var Sequelize = require('sequelize');
var tables = require('../models/tabled.js');

var Unit = tables.Unit;
var pageSize = 3;//每页多少条
var cpage=1;//当前第几页
var start=(cpage-1)*pageSize;
Unit.findAll(
  {
    offset:start,
    limit:pageSize,
    attributes: ['htcode', 'name', 'status','role']
  }).then(function(units){
    
    for(var i = 0; i < units.length; i++){
      console.log(units[i].dataValues.htcode+units[i].dataValues.name+units[i].dataValues.status +units[i].dataValues.role);
    }
}).catch(function(err){
  console.log(err);
});

/*Unit.count().then(function(units){
  var numPage=Math.ceil(units/10);
  console.log(numPage);
}).catch(function(err){
  console.log(err);
});
*/

