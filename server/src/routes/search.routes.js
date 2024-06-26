const express = require("express");
const { searchRecords } = require("../controllers/search.controller");
const { verifyJWT } = require("../middleware/JWTutils");

const router = express.Router();

router.post("/", verifyJWT, searchRecords);

module.exports = router;
