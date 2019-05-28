module.exports = (sequelize, DataTypes) => {
  return sequelize.define('good',{
    
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  })
}