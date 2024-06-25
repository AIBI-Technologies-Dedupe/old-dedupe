require('dotenv').config();
const app = require('./src/app');
const db = require('./src/DB/index');

db.sequelize
  .sync({ alter: true , force: false})
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });