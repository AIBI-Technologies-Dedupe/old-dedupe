const db = require("../DB/index");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { handleError, handleSuccess } = require("../utils/responseHandler");

exports.getUserHistory = asyncHandler(async (req, res) => {
  const loginHistory = await db.user_history.findAll({
    attributes: [
      "userId",
      [db.Sequelize.fn("COUNT", db.Sequelize.col("userId")), "loginCount"],
      [db.Sequelize.fn("MAX", db.Sequelize.col("loginDate")), "lastLoginDate"],
    ],
    include: [
      {
        model: db.user,
        attributes: ["id", "username", "password"],
      },
    ],
    group: ["userId", "user.id"],
  });

  const history = loginHistory.map((record) => ({
    id: record.user.id,
    username: record.user.username,
    password: record.user.password, // Assuming you have a function to decrypt passwords
    loginCount: record.get("loginCount"),
    lastLoginDate: record.get("lastLoginDate"),
  }));

  if (!history) return handleError(res, "No login history found", 404);

  return handleSuccess(res, "Login history retrieved successfully", history);
});
