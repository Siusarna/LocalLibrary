const checkAccess = async (ctx, next) => {
  if (ctx.state.user.role !== 'librarian') {
    return ctx.throw(403, 'You must login as librarian for doing this');
  }
  return next();
};

module.exports = {
  checkAccess,
};
