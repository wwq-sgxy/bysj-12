//var Sequelize = require('sequelize');
//var db = require('../models/dbc.js');
var tables = require('../models/tabled.js');

var Teacher = tables.Teacher;

Teacher.sync({force: true}).then(function () {
  // Table createdgit 
  return Teacher.bulkCreate([
    {
      numid: '00460', 
      name: '王为群', 
      pass: '123456'
    }
  ]);
});