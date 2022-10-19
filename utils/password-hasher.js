const bcrypt = require("bcryptjs");

const passwordHash = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

module.exports = { passwordHash };
