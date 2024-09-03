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
	logout,
	getCount,
} = require("../controllers/auth.controller");

router.post("/signup", createUser); // for development purposes
router.post("/createuser", verifyJWT, checkAdmin, createUser);
router.post("/login", login);
router.post("/refresh", verifyJWT, refresh);
router.delete("/delete/:id", verifyJWT, checkAdmin, deleteUser); // Hard delete
router.put("/update", verifyJWT, checkAdmin, updateUser);
router.get("/count", verifyJWT, checkAdmin, getCount);
router.get("/getusers", verifyJWT, checkAdmin, getAllUsers);
router.post("/logout", logout);

module.exports = router;
