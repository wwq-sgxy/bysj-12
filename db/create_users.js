//var Sequelize = require('sequelize');
//var db = require('../models/dbc.js');
var tables = require('../models/tabled.js');

var User = tables.User;

User.sync({force: true}).then(function () {
  // Table created
  return User.bulkCreate([
    {
      numid: '12115011033', 
      name: '吴国豪', 
      pass: '123456',
      unitId: 11
    },
    {
      numid: '12115011044', 
      name: '许曼琪', 
      pass: '123456',
      unitId: 11
    },
    {
      numid: '12115011044', 
      name: '李华鸿', 
      pass: '123456',
      unitId: 11
    }
  ]);
});