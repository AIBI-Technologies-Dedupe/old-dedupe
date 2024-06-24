require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    logging: false,
    dialect: "mysql",
    freezeTableName: true,
    host: process.env.DB_HOST,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.model")(sequelize);
db.client = require("./models/client.model")(sequelize);
db.product = require("./models/product.model")(sequelize);
db.city = require("./models/city.model")(sequelize);
db.state = require("./models/state.model")(sequelize);
db.pincode = require("./models/pincode.model")(sequelize);
db.city1 = require("./models/city1.model")(sequelize);
db.pincode1 = require("./models/pincode1.model")(sequelize);
db.state1 = require("./models/state1.model")(sequelize);
db.status = require("./models/status.model")(sequelize);
db.raw_data = require("./models/raw_data.model")(sequelize);

db.raw_data.belongsTo(db.client, { foreignKey: 'client_id' });
db.raw_data.belongsTo(db.product, { foreignKey: 'product_id' });
db.raw_data.belongsTo(db.city, { foreignKey: 'city_id' });
db.raw_data.belongsTo(db.state, { foreignKey: 'state_id' });
db.raw_data.belongsTo(db.pincode, { foreignKey: 'pincode_id' });
db.raw_data.belongsTo(db.city1, { foreignKey: 'city1_id' });
db.raw_data.belongsTo(db.pincode1, { foreignKey: 'pincode1_id' });
db.raw_data.belongsTo(db.state1, { foreignKey: 'state1_id' });
db.raw_data.belongsTo(db.status, { foreignKey: 'status_id' });

module.exports = db;
