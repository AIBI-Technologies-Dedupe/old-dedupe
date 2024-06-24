const bcrypt = require("bcrypt");

exports.genPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
};

exports.comparePassword = async (password, userPassword) => {
  const valid = bcrypt.compare(password, userPassword);
  return valid;
};
