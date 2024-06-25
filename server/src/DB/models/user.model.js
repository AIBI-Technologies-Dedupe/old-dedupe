const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      action: {
        type: DataTypes.ENUM("create", "update", "delete", "disabled"),
        allowNull: true,
      },
      modifiedAt: {
        type: DataTypes.DATE,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user", // Default role is "user"
      },
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modifiedBy: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
