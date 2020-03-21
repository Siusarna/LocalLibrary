const { auth } = require('./auth');
const { register } = require('./register');
const { forgotPassword } = require('./forgotPassword');
const { changePassword } = require('./changePassword');
const { updateProfile } = require('./updateProfile');
const { updatePhoto } = require('./updatePhoto');

module.exports = {
  auth,
  register,
  forgotPassword,
  changePassword,
  updateProfile,
  updatePhoto,
};
