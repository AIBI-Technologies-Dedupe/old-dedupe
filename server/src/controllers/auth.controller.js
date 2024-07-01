const db = require("../DB/index");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
	userSchema,
	loginSchema,
	updateUserSchema,
	deleteUserSchema,
	genPassword,
	comparePassword,
} = require("../utils/authUtils");
const logger = require("../configs/loggerConfig");

exports.createUser = asyncHandler(async (req, res, next) => {
	try {
		const { email, password, role, name, phoneNo } = req.body;
		const createdBy = req.user ? req.user.email : "system"; // Use 'system' or another default value for initial account creation

		const { error } = userSchema.validate({
			email,
			password,
			role,
			name,
			phoneNo,
		});
		if (error) return res.status(400).json({ error: error.details[0].message });

		const existingUser = await db.user.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await genPassword(password);
		const newUser = await db.user.create({
			email,
			password: hashedPassword,
			role,
			name,
			phoneNo,
			createdBy,
			modifiedBy: createdBy,
			action: "create",
		});

		res.status(201).json({ message: "User created successfully", user: newUser });
	} catch (error) {
		logger.error('Create User Error:', error);
		next(error);
	}
});

exports.login = asyncHandler(async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const { error } = loginSchema.validate({ email, password });
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		const user = await db.user.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const today = new Date();
		today.setUTCHours(0, 0, 0, 0);

		let userHistory;
		try {
			userHistory = await db.user_history.findOne({
				where: {
					user_id: user.id,
					loginDate: today,
				},
			});
		} catch (err) {
			logger.error("Database query error:", err);
			return res.status(500).json({ error: "Database query error" });
		} 

		if (userHistory) {
			userHistory.loginCount += 1;
			await userHistory.save();
		} else {
			await db.user_history.create({
				user_id: user.id,
				loginDate: today,
				loginCount: 1,
			});
		}

		const accessToken = jwt.sign(
			{ UserInfo: { id: user.id, email: user.email, role: user.role } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "3h" }
		);

		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "3h" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 3 * 60 * 60 * 1000,
		});
		userDetails = {
			id: user.id,
			name: user.name,
			role: user.role,
		};

		res.status(200).json({ accessToken, user: userDetails });
	} catch (error) {
		logger.error('Login Error:', error);
		next(error);
	}
});

exports.getCount = asyncHandler(async (req, res, next) => {
	try {
		const { count } = await db.user.findAndCountAll();
		res.status(200).json(count);
	} catch (error) {
		logger.error('Get Count Error:', error);
		next(error);
	}
});

exports.refresh = asyncHandler(async (req, res, next) => {
	try {
		const { jwt: refreshToken } = req.cookies;
		if (!refreshToken) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await db.user.findOne({ where: { id: decoded.id } });
		if (!user) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const accessToken = jwt.sign(
			{ UserInfo: { id: user.id, email: user.email, role: user.role } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "3h" }
		);

		res.status(200).json({ message: "Token refreshed successfully", accessToken });
	} catch (error) {
		if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
			return res.status(403).json({ error: "Invalid token, please login again." });
		}
		logger.error('Refresh Token Error:', error);
		next(error);
	}
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	try {
		const users = await db.user.findAll();
		res.status(200).json({ message: "Users retrieved successfully", users });
	} catch (error) {
		logger.error('Get All Users Error:', error);
		next(error);
	}
});

exports.updateUser = asyncHandler(async (req, res, next) => {
	try {
		const { id, newEmail, newPassword, newName, newPhoneno } = req.body;

		const { error } = updateUserSchema.validate({
			id,
			newEmail,
			newPassword,
			newName,
			newPhoneno,
		});
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		const user = await db.user.findOne({ where: { id } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (newEmail) user.email = newEmail;
		if (newPassword) user.password = await genPassword(newPassword);
		if (newName) user.name = newName;
		if (newPhoneno) user.phoneNo = newPhoneno;

		user.modifiedAt = Date.now();
		user.modifiedBy = req.user.email;
		user.action = "update";

		await user.save();
		res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		logger.error('Update User Error:', error);
		next(error);
	}
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.body;

		const { error } = deleteUserSchema.validate({ id });
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		const user = await db.user.findOne({ where: { id } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.activated = false;
		user.modifiedAt = Date.now();
		user.modifiedBy = req.user.email;
		user.action = "delete";

		await user.save();
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		logger.error('Delete User Error:', error);
		next(error);
	}
});

exports.disableUser = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.body;

		const { error } = deleteUserSchema.validate({ id });
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		const user = await db.user.findOne({ where: { id } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.activated = false;
		user.modifiedAt = Date.now();
		user.modifiedBy = req.user.email;
		user.action = "disabled";

		await user.save();
		res.status(200).json({ message: "User disabled successfully" });
	} catch (error) {
		logger.error('Disable User Error:', error);
		next(error);
	}
});

exports.logout = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.status(200).json({ message: "No token found" });
	}

	res.clearCookie("jwt", { httpOnly: true, secure: true });
	res.status(200).json({ message: "Logout successful" });
};
