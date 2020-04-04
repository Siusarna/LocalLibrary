const checkAccess = async (ctx, next) => {
  if (ctx.state.user.role !== 'librarian') {
    ctx.throw(403, 'You must login as librarian for doing this');
  }
  next();
};

module.exports = {
  checkAccess,
};
