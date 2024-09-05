const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { logger } = require("./configs/loggerConfig");

const app = express();

const authRoutes = require("./routes/auth.routes");
const dataRoutes = require("./routes/data.routes");
const searchRoutes = require("./routes/search.routes");
const historyRoutes = require("./routes/history.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);
app.use("/search", searchRoutes);
app.use("/history", historyRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
	logger.error("Express Error:", err);
	res.status(500).send("Something went wrong!");
});

// Uncaught Exception Handler
process.on("uncaughtException", (err) => {
	logger.error("Uncaught Exception:", err);
	process.exit(1); // Optionally, exit the process if necessary
});

// Unhandled Rejection Handler
process.on("unhandledRejection", (reason, promise) => {
	logger.error("Unhandled Rejection at:", promise, "reason:", reason);
	// Optionally, you can exit the process if necessary
	// process.exit(1);
});

module.exports = app;
