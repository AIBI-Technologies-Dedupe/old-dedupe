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
db.user_history = require("./models/user_history.model")(sequelize);
db.search_history = require("./models/search_history.model")(sequelize);

require("./associations")(db);

module.exports = db;
