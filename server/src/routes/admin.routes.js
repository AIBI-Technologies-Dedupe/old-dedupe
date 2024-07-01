const express = require("express");
const { exportUsersToExcel } = require("../controllers/admin.controller");
const { verifyJWT, checkAdmin } = require("../middleware/JWTutils");
const router = express.Router();

router.get("/export-users", verifyJWT, checkAdmin, exportUsersToExcel);

module.exports = router;
