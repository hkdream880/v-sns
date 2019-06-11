module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reply',{
    reply: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },{
    timestamp: true,
    paranoid: true,
  })
}