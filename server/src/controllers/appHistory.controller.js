const db = require("../DB/index");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { handleError, handleSuccess } = require("../utils/responseHandler");

exports.getUserHistory = asyncHandler(async (req, res) => {
  const userHistory = await db.user_history.findAll({
    include: [
      {
        model: db.user,
        attributes: ["id","email","password"],
      },
    ],
    order: [["loginDate", "DESC"]],
  });

  const formattedHistories = userHistory.map(history => ({
    id: history.user.id,
    username: history.user.username,
    email: history.user.email,
    loginDate: history.loginDate,
    loginCount: history.loginCount
  }));

  if (!userHistory) return handleError(res, "No login history found", 404);

  return handleSuccess(res, "Login history retrieved successfully", formattedHistories);
});
