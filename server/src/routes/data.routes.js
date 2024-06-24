const express = require("express");
const router = express.Router();

const { importData } = require("../controllers/data.controller");
const { upload } = require("../configs/multerConfig");
const { verifyJWT } = require("../middleware/JWTutils");

router.post("/import",verifyJWT, upload.single("file"), importData);

module.exports = router;
