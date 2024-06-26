const express = require("express");
const router = express.Router();

const {
	importData,
	deleteAllData,
	getCount,
} = require("../controllers/data.controller");
const { upload } = require("../configs/multerConfig");
const { verifyJWT, checkAdmin } = require("../middleware/JWTutils");

router.post("/import",  upload.single("file"), importData);
router.get("/count", verifyJWT, checkAdmin, getCount);
router.delete("/delete", verifyJWT, deleteAllData);

module.exports = router;
