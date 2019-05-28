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
db.Sns = require('./sns')(sequelize, Sequelize);
db.Good = require('./good')(sequelize, Sequelize);

db.User.hasMany(db.Sns);
db.User.hasMany(db.Good);
db.Sns.hasMany(db.Good);
db.Sns.belongsTo(db.User);
db.Good.belongsTo(db.User);
db.Good.belongsTo(db.Sns);

module.exports = db;