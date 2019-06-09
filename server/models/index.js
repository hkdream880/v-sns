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

db.User.hasMany(db.Contents);
db.User.hasMany(db.Good);
db.Contents.hasMany(db.Good);
db.Contents.belongsTo(db.User);
db.Good.belongsTo(db.User);
db.Good.belongsTo(db.Contents);
db.HashTag.hasMany(db.HashTagContents);
db.HashTagContents.belongsTo(db.HashTag);
db.Contents.hasMany(db.HashTagContents);
db.HashTagContents.belongsTo(db.Contents);

module.exports = db;