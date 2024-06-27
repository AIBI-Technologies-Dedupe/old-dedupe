require("dotenv").config();
const app = require("./src/app");
const db = require("./src/DB/index");

db.sequelize
	.sync({ force : true})
	.then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server is running at port : ${process.env.PORT || 8000}`);
		});
	})
	.catch((err) => {
		console.error("Error during database synchronization:", err);
	});
