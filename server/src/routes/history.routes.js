const express = require("express");

const { getUserHistory , getSearchHistory, getUploadHistory } = require("../controllers/appHistory.controller");
const {verifyJWT , checkAdmin} = require("../middleware/JWTutils")

const router = express.Router();

router.get("/user", verifyJWT, checkAdmin, getUserHistory);
router.get("/search", verifyJWT, checkAdmin, getSearchHistory);
router.get("/upload", verifyJWT, checkAdmin, getUploadHistory);


module.exports = router;