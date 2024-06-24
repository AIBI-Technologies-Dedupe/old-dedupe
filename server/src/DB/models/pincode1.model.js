const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("pincode1", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    timestamps: false,
  });
};
