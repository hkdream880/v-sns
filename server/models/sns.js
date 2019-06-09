module.exports = (sequelize, DataTypes) => {
  return sequelize.define('sns',{
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    good: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  })
}