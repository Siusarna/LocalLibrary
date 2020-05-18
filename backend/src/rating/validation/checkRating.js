const { isInt } = require('validator');

const checkRating = (ctx, next) => {
  const { rating } = ctx.request.body;
  if (rating < 1 || rating > 5) {
    ctx.throw('Rating must be between 1 and 5');
  }
  if (!isInt(rating)) {
    ctx.throw('Rating must be an integer');
  }
  return next();
};

module.exports = {
  checkRating,
};
