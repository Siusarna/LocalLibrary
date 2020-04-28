const subscriptionServices = require('./services');

const createSubscription = async (ctx) => {
  try {
    await subscriptionServices.createSubscription(ctx.state.user, ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Subscription successfully created',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  createSubscription,
};
