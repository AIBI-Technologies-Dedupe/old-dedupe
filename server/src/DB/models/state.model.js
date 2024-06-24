const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("state", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
};
