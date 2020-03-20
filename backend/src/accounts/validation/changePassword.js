const {
  matches,
} = require('validator');

const changePassword = (ctx, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = ctx.request.body;
  if (!matches(currentPassword, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    ctx.throw(400, 'Wrong password');
  }
  if (!matches(newPassword, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    ctx.throw(400, 'Wrong password');
  }
  if (!matches(confirmNewPassword, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    ctx.throw(400, 'Wrong password');
  }
  return next();
};

module.exports = {
  changePassword,
};
