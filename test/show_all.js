var Sequelize = require('sequelize');
var tables = require('../models/tabled.js');

var User = tables.User;
var id='sysadm2';
User.findAll(
  {
    order: 'numid ASC ',
      
    
    //where:{numid:id},
    //attributes: ['numid', 'name', 'pass']
  }).then(function(users){
    console.log(users);
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

