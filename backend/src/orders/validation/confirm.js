const { isBoolean } = require('validator');

const confirm = (ctx, next) => {
  const { orderId, confirmation } = ctx.request.body;
  if (!orderId) {
    return ctx.throw(400, 'Wrong orderId');
  }
  if (!confirmation || !isBoolean(confirmation)) {
    return ctx.throw(400, 'Wrong confirmation');
  }
  return next();
};

module.exports = {
  confirm,
};
