const {
  isEmail, matches,
} = require('validator');

const auth = (ctx, next) => {
  const { email, password } = ctx.request.body;
  if (!email || !isEmail(email)) {
    ctx.throw(400, 'Wrong email');
  }
  if (!password || !matches(password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    ctx.throw(400, 'Wrong password');
  }
  return next();
};

module.exports = {
  auth,
};
