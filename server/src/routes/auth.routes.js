const express = require("express");
const router = express.Router();
const { verifyJWT, checkAdmin } = require("../middleware/JWTutils");
const {
  createUser,
  login,
  refresh,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/auth.controller");

router.post("/signup", verifyJWT, checkAdmin, createUser);
router.post("/login", login);
router.post("/refresh", refresh);
router.delete("/delete", verifyJWT, checkAdmin, deleteUser);
router.put("/update", verifyJWT, checkAdmin, updateUser);
router.get("/getusers", verifyJWT, checkAdmin, getAllUsers);

module.exports = router;
