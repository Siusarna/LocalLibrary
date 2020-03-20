const { auth } = require('./auth');
const { register } = require('./register');
const { forgotPassword } = require('./forgotPassword');
const { changePassword } = require('./changePassword');

module.exports = {
  auth,
  register,
  forgotPassword,
  changePassword,
};
