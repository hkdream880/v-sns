const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};
console.log('test env: ',env);
console.log(config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Contents = require('./contents')(sequelize, Sequelize);
db.Good = require('./good')(sequelize, Sequelize);
db.HashTag = require('./hashTag')(sequelize, Sequelize);
db.HashTagContents = require('./hashContents')(sequelize, Sequelize);
db.Replies = require('./replies')(sequelize, Sequelize);
db.Follows = require('./follows')(sequelize, Sequelize);


//TODO : 관계설정 다시 할 것
//다대다, 일대다, 일대일

//db.User.hasMany(db.Contents);
db.Contents.belongsTo(db.User);

//db.User.hasMany(db.Good);
db.Good.belongsTo(db.User);

//db.Contents.hasMany(db.Good);
db.Good.belongsTo(db.Contents);

//db.HashTag.hasMany(db.HashTagContents);
db.HashTagContents.belongsTo(db.HashTag);

//db.Contents.hasMany(db.HashTagContents);
db.HashTagContents.belongsTo(db.Contents);

//db.Contents.hasMany(db.Replies);
db.Replies.belongsTo(db.Contents);

//db.User.hasMany(db.Replies);
db.Replies.belongsTo(db.User);

//db.User.hasMany(db.Follows); 
db.Follows.belongsTo(db.User);

module.exports = db;