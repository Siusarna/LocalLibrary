const { auth } = require('./auth');
const { register } = require('./register');
const { forgotPassword } = require('./forgotPassword');

module.exports = {
  auth,
  register,
  forgotPassword,
};
