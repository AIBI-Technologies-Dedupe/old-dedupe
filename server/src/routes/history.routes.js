const express = require("express");

const { getUserHistory , getSearchHistory } = require("../controllers/appHistory.controller");
const {verifyJWT , checkAdmin} = require("../middleware/JWTutils")

const router = express.Router();

router.get("/user", verifyJWT, checkAdmin, getUserHistory);
router.get("/search", verifyJWT, checkAdmin, getSearchHistory);


module.exports = router;