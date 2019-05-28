module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users',{
    email: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  },{
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true,
  });
}