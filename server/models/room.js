module.exports = (sequelize, DataTypes) => {
  return sequelize.define('room',{
    
  },{
    timestamp: true,
    paranoid: true,
  })
}