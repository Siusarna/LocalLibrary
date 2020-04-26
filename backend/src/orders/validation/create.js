const create = (ctx, next) => {
  const { bookId } = ctx.request.body;
  if (!bookId) {
    return ctx.throw(400, 'Wrong bookId');
  }
  return next();
};

module.exports = {
  create,
};
