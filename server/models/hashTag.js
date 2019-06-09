module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hash_tags',{
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  })
}