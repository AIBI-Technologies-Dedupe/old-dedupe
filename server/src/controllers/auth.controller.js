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
const { handleError, handleSuccess } = require("../utils/responseHandler");
const { where } = require("sequelize");

exports.createUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const { error } = userSchema.validate({ email, password, role });
  if (error) return handleError(res, error.details[0].message, 400);

  const existingUser = await db.user.findOne({ where: { email } });
  if (existingUser) return handleError(res, "User already exists", 400);

  const hashedPassword = await genPassword(password);
  const newUser = await db.user.create({
    email,
    password: hashedPassword,
    role,
  });

  return handleSuccess(res, "User created successfully", newUser);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { email } });
  if (!user) return handleError(res, "Invalid email or password", 401);

  const match = await comparePassword(password, user.password);
  if (!match) return handleError(res, "Invalid email or password", 401);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let userHistory = await db.user_history.findOne({
    where: { user_id: user.id, loginDate: today },
  })

  if (userHistory) {
    // If there's a record for today, increment the login count
    userHistory.loginCount += 1;
    await userHistory.save();
  } else {
    // If there's no record for today, create a new record
    await db.user_history.create({
      userId: user.id,
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

  return handleSuccess(res, "Login successful", { token: accessToken });
});

exports.refresh = asyncHandler(async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  if (!refreshToken) return handleError(res, "Unauthorized", 401);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await db.user.findOne({ where: { id: decoded.id } });
    if (!user) return handleError(res, "Unauthorized", 401);

    const accessToken = jwt.sign(
      { UserInfo: { id: user.id, email: user.email, role: user.role } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" }
    );

    return handleSuccess(res, "Token refreshed successfully", { accessToken });
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return handleError(res, "Invalid token, please login again.", 403);
    }
    return handleError(res, "Internal server error.", 500);
  }
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await db.user.findAll();
  return handleSuccess(res, "Users retrieved successfully", users);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id, newEmail, newPassword } = req.body;

  const { error } = updateUserSchema.validate({ id, newEmail, newPassword });
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { id } });
  if (!user) return handleError(res, "User not found", 404);

  if (newEmail) user.email = newEmail;
  if (newPassword) user.password = await genPassword(newPassword);

  await user.save();
  return handleSuccess(res, "User updated successfully", user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { error } = deleteUserSchema.validate({ id });
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { id } });
  if (!user) return handleError(res, "User not found", 404);

  await user.destroy();
  return handleSuccess(res, "User deleted successfully");
});
