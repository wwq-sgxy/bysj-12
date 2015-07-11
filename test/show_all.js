var Sequelize = require('sequelize');
var tables = require('../models/tabled.js');

var Unit = tables.Unit;
User.findAll(
  {
    attributes: ['numid', 'name', 'pass']
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

