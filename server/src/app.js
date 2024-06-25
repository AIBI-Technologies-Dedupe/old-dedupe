const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const app = express();

const authRoutes = require("./routes/auth.routes");
const dataRoutes = require("./routes/data.routes");
const searchRoutes = require("./routes/search.routes");
const historyRoutes = require("./routes/history.routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);
app.use("/search", searchRoutes);
app.use("/history", historyRoutes);

module.exports = app;
