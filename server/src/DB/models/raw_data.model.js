const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("raw_data", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "clients",  // Explicitly specify the table name
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",  // Explicitly specify the table name
        key: "id",
      },
    },
    login_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    door_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    residence_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "cities",  // Explicitly specify the table name
        key: "id",
      },
    },
    state_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "states",  // Explicitly specify the table name
        key: "id",
      },
    },
    pincode_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pincodes",  // Explicitly specify the table name
        key: "id",
      },
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    office_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "city1s",  // Explicitly specify the table name
        key: "id",
      },
    },
    pincode1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "pincode1s",  // Explicitly specify the table name
        key: "id",
      },
    },
    state1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "state1s",  // Explicitly specify the table name
        key: "id",
      },
    },
    residence_landline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    office_landline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadhar_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passport_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    election_id_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicle_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dl_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "statuses",  // Explicitly specify the table name
        key: "id",
      },
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'raw_data',  // Explicitly specify the table name
    freezeTableName: true 
  });
};
