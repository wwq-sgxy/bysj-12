var Sequelize = require('sequelize'),
    db = require('../models/dbc.js'),
    crypto = require('crypto'),
    hmac = crypto.createHmac('sha1', '650827');
    //validator = require('validator');

//定义Unit模型
var Unit = db.sequelize.define('unit', {
  htcode: {
    type: Sequelize.STRING,
    unique: true
  },
  name: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  role: Sequelize.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['htcode']
      }
    ]
  }
);

//定义User模型
var User = db.sequelize.define('user', 
  {
    numid: {
      type: Sequelize.STRING,
      unique: true
      //validate: {
      //  is: /^\d{12}$/
      //}
    },
    name: Sequelize.STRING,
    pass: Sequelize.CHAR(40),
    unitid: {
      type: Sequelize.INTEGER,
      references: {
        model: Unit,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    astatus: {
      type: Sequelize.STRING,
      defaultValue: '审核中'
    },
    cidset: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['numid']
      }
    ]
  }
);
/*
User.sync().then(function () {
  // Table created
  return User.create(
    {
      numid: 'sysadm5', 
      name: '李华鸿', 
      pass: hmac.update('123456').digest('hex'),
      unitid: 1,
      astatus: '已通过'
    }
  );
});
*/
/*
User.findById(1).then(function(user) {
  console.log(user.name);
  console.log(db.dbTimeToLocaltime({
    dbtime: user.createdAt,
    tz: 8
  }).toLocaleString());
});
*/

var pass = hmac.update('123456').digest('hex');
User.findOne({
  where: {numid: 'sysadm2', pass: pass},
  attributes: ['id', 'numid', 'name']
}).then(function(user) {
  if (user) {
    console.log(user.id, user.numid, user.name);
  } else {
    console.log('没找到！');
  }
});