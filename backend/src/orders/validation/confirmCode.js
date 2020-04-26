const confirmCode = (ctx, next) => {
  const { orderId, code } = ctx.request.body;
  if (!orderId) {
    return ctx.throw(400, 'Wrong orderId');
  }
  if (!code) {
    return ctx.throw(400, 'Wrong code');
  }
  return next();
};

module.exports = {
  confirmCode,
};
