const db = require("../DB/index");
const asyncHandler = require("express-async-handler");
const logger = require("../configs/loggerConfig");

exports.getUserHistory = asyncHandler(async (req, res, next) => {
	try {
		const userHistory = await db.user_history.findAll({
			include: [
				{
					model: db.user,
					attributes: ["id", "email", "password", "role"],
				},
			],
			order: [["loginDate", "DESC"]],
		});

		if (!userHistory || userHistory.length === 0) {
			return res.status(404).json({ error: "No login history found" });
		}

		const formattedHistories = userHistory.map((history) => ({
			id: history.user.id,
			username: history.user.username,
			email: history.user.email,
			password: history.user.password,
			role: history.user.role,
			loginDate: new Date(history.loginDate).toLocaleDateString(),
			loginCount: history.loginCount,
		}));

		res.status(200).json({
			message: "Login history retrieved successfully",
			data: formattedHistories,
		});
	} catch (error) {
		logger.error("Error retrieving user history:", error);
		next(error);
	}
});

exports.getSearchHistory = asyncHandler(async (req, res, next) => {
	try {
		const searchHistory = await db.search_history.findAll({
			include: [
				{
					model: db.user,
					attributes: ["id", "email", "password", "phoneNo", "name"],
				},
			],
			order: [["searchDate", "DESC"]],
		});

		if (!searchHistory || searchHistory.length === 0) {
			return res.status(404).json({ error: "No search history found" });
		}

		const formattedHistories = searchHistory.map((history) => ({
			id: history.user.id,
			name: history.user.name,
			email: history.user.email,
			password: history.user.password,
			phoneNo: history.user.phoneNo,
			searchDate: new Date(history.searchdate).toLocaleDateString(),
			searchCount: history.searchCount,
		}));

		res.status(200).json({
			message: "Search history retrieved successfully",
			data: formattedHistories,
		});
	} catch (error) {
		logger.error("Error retrieving search history:", error);
		next(error);
	}
});

exports.getUploadHistory = asyncHandler(async (req, res, next) => {
	try {
		const uploadHistory = await db.upload_history.findAll({
			include: [
				{
					model: db.user, // Make sure you have defined the association between upload_histories and users
					attributes: ["id", "email"], // Add other user attributes if needed
				},
			],
			order: [["uploadDate", "DESC"]],
		});

		if (!uploadHistory || uploadHistory.length === 0) {
			return res.status(404).json({ error: "No upload history found" });
		}

		const formattedHistories = uploadHistory.map((history) => ({
			uploadId: history.id,
			userId: history.user.id,
			username: history.user.username,
			email: history.user.email,
			uploadDate: new Date(history.uploadDate).toLocaleDateString(),
			successfulUploadCount: history.successfulUploadCount,
			failUploadCount: history.failUploadCount,
		}));

		res.status(200).json({
			message: "Upload history retrieved successfully",
			data: formattedHistories,
		});
	} catch (error) {
		console.error("Error retrieving upload history:", error);
		next(error);
	}
});
