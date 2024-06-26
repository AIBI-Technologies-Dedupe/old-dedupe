const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("status", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(1024),
      unique: true,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
};
