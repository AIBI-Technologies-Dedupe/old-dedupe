const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("client", {
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
