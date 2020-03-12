const bcrypt = require('bcryptjs');

const checkPassword = (inputPassword, passwordFromDb) => {
  if (!inputPassword || passwordFromDb) return false;
  return bcrypt.compareSync(inputPassword, passwordFromDb);
};

module.exports = {
  checkPassword,
};
