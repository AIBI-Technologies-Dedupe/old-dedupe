const express = require('express');
const router = express.Router();

const {importData} = require("../controllers/data.controller")
const {upload} = require("../configs/multerConfig");


router.post("/import",upload.single('file'), importData);

module.exports = router;