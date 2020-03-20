const {
  isEmail,
} = require('validator');

const forgotPassword = (ctx, next) => {
  const { email } = ctx.request.body;
  if (!isEmail(email)) {
    ctx.throw(400, 'Wrong email');
  }
  return next();
};

module.exports = {
  forgotPassword,
};
