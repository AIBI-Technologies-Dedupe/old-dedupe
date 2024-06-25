const bcrypt = require("bcrypt");
const joi = require("joi");

exports.userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().valid("admin", "user").required(),
});

exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

exports.updateUserSchema = joi.object({
  id: joi.number().integer().required(),
  newEmail: joi.string().email().optional(),
  newPassword: joi.string().min(6).optional()
});

exports.deleteUserSchema = joi.object({
  id: joi.number().integer().required()
});

exports.genPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
};

exports.comparePassword = async (password, userPassword) => {
  const valid = bcrypt.compare(password, userPassword);
  return valid;
};
