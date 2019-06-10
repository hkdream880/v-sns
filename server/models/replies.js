module.exports = (sequelize, DataTypes) => {
  return sequelize.define('replies',{
    reply: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  })
}