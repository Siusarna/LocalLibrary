const orderServices = require('./services');

const create = async (ctx) => {
  try {
    await orderServices.create(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Order successfully created',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  create,
};
