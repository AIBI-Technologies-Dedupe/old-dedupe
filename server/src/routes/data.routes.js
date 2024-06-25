const express = require("express");
const router = express.Router();

const {
  importData,
  deleteAllData,
} = require("../controllers/data.controller");
const { upload } = require("../configs/multerConfig");
const { verifyJWT } = require("../middleware/JWTutils");

router.post("/import", verifyJWT, upload.single("file"), importData);
router.delete("/delete", deleteAllData);

module.exports = router;
