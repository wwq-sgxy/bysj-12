var Sequelize = require('sequelize');
//var dbc = new Sequelize('postgres://webt:webt12@localhost:5432/pubdb');
var sequelize = new Sequelize('pubdb', 'webt', 'webt12', {
  dialect: 'postgres',
  timezone: '+08:00'
});

exports.sequelize = sequelize;

exports.dbTimeToLocaltime = function (options) {
  var localTime = new Date();
  localTime.setTime(options['dbtime'].getTime() + options.tz*3600*1000);
  return localTime;
};