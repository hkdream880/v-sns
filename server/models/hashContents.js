module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hash_contents',{
    
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  });
}