const sendConfirmationCode = (ctx, next) => {
  const { orderId } = ctx.request.body;
  if (!orderId) {
    return ctx.throw(400, 'Wrong orderId');
  }
  return next();
};

module.exports = {
  sendConfirmationCode,
};
