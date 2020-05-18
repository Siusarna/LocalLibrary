const { isLength } = require('validator');

const checkValues = (ctx, next) => {
  const {
    title, content,
  } = ctx.request.body;

  if (title && !isLength(title, {
    min: 2,
    max: 90,
  })) {
    return ctx.throw(400, 'Review title length is wrong');
  }

  if (content && !isLength(title, {
    min: 3,
    max: 500,
  })) {
    return ctx.throw(400, 'Review content length is wrong');
  }

  return next();
};

module.exports = checkValues;
