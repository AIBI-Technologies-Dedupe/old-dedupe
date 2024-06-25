const express = require("express");

const { getUserHistory } = require("../controllers/appHistory.controller");

const {verifyJWT , checkAdmin} = require("../middleware/JWTutils")

const router = express.Router();

router.get("/user", getUserHistory);

module.exports = router;