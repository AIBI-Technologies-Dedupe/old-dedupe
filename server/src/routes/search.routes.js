const express = require("express");
const {
	searchRecords,
	getRecordById,
} = require("../controllers/search.controller");
const { verifyJWT } = require("../middleware/JWTutils");

const router = express.Router();

router.post("/", verifyJWT, searchRecords);
router.get("/:id", verifyJWT, getRecordById);

module.exports = router;
