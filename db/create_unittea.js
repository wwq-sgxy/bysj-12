//var Sequelize = require('sequelize');
//var db = require('../models/dbc.js');
var tables = require('../models/tabled.js');

var UnitTea = tables.UnitTea;

UnitTea.sync({force: true}).then(function () {
  // Table created
  return UnitTea.bulkCreate([
    {
      htcode: '00-00-00', 
      name: '系统管理组', 
      status: true
    },
    {
      htcode: '01-05-01', 
      name: '信息科学与工程学院-院领导',
      status: true
    },
    {
      htcode: '01-05-02', 
      name: '信息科学与工程学院-院办公室', 
      status: true
    },
    {
      htcode: '01-05-03', 
      name: '信息科学与工程学院-学生工作办公室', 
      status: true
    },
    {
      htcode: '01-05-04', 
      name: '信息科学与工程学院-计算机科学技术系', 
      status: true
    },
    {
      htcode: '01-05-05', 
      name: '信息科学与工程学院-通信工程系',
      status: true
    },
    {
      htcode: '01-05-06', 
      name: '信息科学与工程学院-信息管理与信息系统系', 
      status: true
    },
    {
      htcode: '01-05-07', 
      name: '信息科学与工程学院-物联网工程系',
      status: true
    },
    {
      htcode: '01-05-08', 
      name: '信息科学与工程学院-计算机公共教学系',
      status: true
    },
    {
      htcode: '01-05-09', 
      name: '信息科学与工程学院-实验中心',
      status: true
    }
  ]);
});