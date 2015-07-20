//var Sequelize = require('sequelize');
//var db = require('../models/dbc.js');
var tables = require('../models/tabled.js');

var UnitStu = tables.UnitStu;

UnitStu.sync({force: true}).then(function () {
  // Table created
  return UnitStu.bulkCreate([
    {
      htcode: '05-2012-01-01', 
      name: '信息科学与工程学院-2012级-计算机科学技术专业-1班',
      status: true
    },
    {
      htcode: '05-2012-01-02', 
      name: '信息科学与工程学院-2012级-计算机科学技术专业-2班',
      status: true
    },
    {
      htcode: '05-2012-01-03', 
      name: '信息科学与工程学院-2012级-计算机科学技术专业-3班',
      status: true
    }
  ]);
});