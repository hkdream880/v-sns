module.exports = (sequelize, DataTypes) => {
  return sequelize.define('contents',{
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
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