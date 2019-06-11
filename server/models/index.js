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
db.HashTag = require('./hashTag')(sequelize, Sequelize);
db.Replies = require('./replies')(sequelize, Sequelize);


//TODO : 관계설정 다시 할 것
//다대다, 일대다, 일대일
/*
users contents
1:다

users replies
1:다

contenst user
다:다 (goods 를 통해)

users user
다:다 (follows 를 통해)

contents hashTag
다:다 (hashContents 를 통해)

contents replies
다:다 (replyContents 를 통해)
*/
db.User.hasMany(db.Contents,{foreignKey:'userId', sourceKey:'id'});
db.Contents.belongsTo(db.User,{foreignKey:'userId', targetKey:'id'});

db.User.hasMany(db.Replies,{foreignKey:'userId', sourceKey:'id'});
db.Replies.belongsTo(db.User,{foreignKey:'userId', targetKey:'id'});

db.Contents.hasMany(db.Replies,{foreignKey:'contentId', sourceKey:'id'});
db.Replies.belongsTo(db.Contents,{foreignKey:'contentId', targetKey:'id'});

db.Contents.belongsToMany(db.User,{through: 'goods'});
db.User.belongsToMany(db.Contents,{through: 'goods'});

db.User.belongsToMany(db.User,{through: 'follows', foreignKey: 'followerId', as: 'Follower'});
db.User.belongsToMany(db.User,{through: 'follows', foreignKey: 'followingId', as: 'Following'});

db.Contents.belongsToMany(db.HashTag,{through: 'hashContents'});
db.HashTag.belongsToMany(db.Contents,{through: 'hashContents'});

module.exports = db;