var Sequelize = require('sequelize');
var db = require('../models/dbc.js');

//定义User模型
var User = db.sequelize.define('User', {
  stunum: {
    type: Sequelize.STRING,
    validate: {
      is: /^\d{12}$/
    }
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
/*
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    stunum: '121150110001', 
    name: '李月', 
    email: 'example-3@mycampus.com'
  });
});
*/

User.findById(1).then(function(user) {
  console.log(user.name);
  console.log(db.dbTimeToLocaltime({
    dbtime: user.createdAt,
    tz: 8
  }).toLocaleString());
});
