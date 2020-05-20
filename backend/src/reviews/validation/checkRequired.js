const checkRequired = (ctx, next) => {
  const {
    title, content,
  } = ctx.request.body;

  if (!title) {
    return ctx.throw(400, 'Review title is required');
  }

  if (!content) {
    return ctx.throw(400, 'Review content is required');
  }

  return next();
};

module.exports = checkRequired;
