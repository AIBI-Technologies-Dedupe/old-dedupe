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
  const { email, password, role, name, phoneNo } = req.body;
  const createdBy = req.user ? req.user.email : 'system'; // Use 'system' or another default value for initial account creation

  const { error } = userSchema.validate({ email, password, role, name, phoneNo });
  if (error) return handleError(res, error.details[0].message, 400);

  const existingUser = await db.user.findOne({ where: { email } });
  if (existingUser) return handleError(res, "User already exists", 400);

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

  return handleSuccess(res, "User created successfully", newUser);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    console.error('Validation error:', error.details[0].message);
    return handleError(res, error.details[0].message, 400);
  }

  const user = await db.user.findOne({ where: { email } });
  if (!user) {
    return handleError(res, "Invalid email or password", 401);
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return handleError(res, "Invalid email or password", 401);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let userHistory;
  try {
    userHistory = await db.user_history.findOne({
      where: {
        user_id: user.id,
        loginDate: today,
      },
    });
  } catch (err) {
    return handleError(res, 'Database query error', 500);
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
  const { id, newEmail, newPassword, newName, newPhoneno } = req.body;

  const { error } = updateUserSchema.validate({ id, newEmail, newPassword,  newName, newPhoneno});
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { id } });
  if (!user) return handleError(res, "User not found", 404);

  if (newEmail) user.email = newEmail;
  if (newPassword) user.password = await genPassword(newPassword);
  if (newName) user.name = newName;
  if (newPhoneno) user.phoneNo = newPhoneno;

  user.modifiedAt = Date.now();
  user.modifiedBy = req.user.email;
  user.action = "update";
  await user.save();
  return handleSuccess(res, "User updated successfully", user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { error } = deleteUserSchema.validate({ id });
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { id } });
  if (!user) return handleError(res, "User not found", 404);

  user.activated = false;
  user.modifiedAt = Date.now();
  user.modifiedBy = req.user.email;
  user.action = "delete";

  await user.destroy();
  return handleSuccess(res, "User deleted successfully");
});

exports.disableUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const { error } = deleteUserSchema.validate({ id });
  if (error) return handleError(res, error.details[0].message, 400);

  const user = await db.user.findOne({ where: { id } });
  if (!user) return handleError(res, "User not found", 404);

  user.activated = false;
  user.modifiedAt = Date.now();
  user.modifiedBy = req.user.email;
  user.action = "disabled";

  await user.save();
  return handleSuccess(res, "User deleted successfully");
});