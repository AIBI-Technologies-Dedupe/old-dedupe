const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("city", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    timestamps: false,
  });
};
