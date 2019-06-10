module.exports = (sequelize, DataTypes) => {
  return sequelize.define('follows',{
    
  },{
    createdAt: DataTypes.DATE,
    paranoid: true,
  })
}