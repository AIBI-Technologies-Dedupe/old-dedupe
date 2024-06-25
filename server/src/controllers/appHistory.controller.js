const db = require("../DB/index");
const asyncHandler = require("express-async-handler");

exports.getUserHistory = asyncHandler(async (req, res) => {
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

  res.status(200).json({ message: "Login history retrieved successfully", data: formattedHistories });
});

exports.getSearchHistory = asyncHandler(async (req, res) => {
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
    searchDate: new Date(history.searchDate).toLocaleDateString(),
    searchCount: history.searchCount,
  }));

  res.status(200).json({ message: "Search history retrieved successfully", data: formattedHistories });
});
