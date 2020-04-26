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

const getOrders = async (ctx) => {
  try {
    ctx.body = await orderServices.getOrders(ctx.state.user);
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const confirm = async (ctx) => {
  try {
    await orderServices.confirm(ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Order successfully confirmed',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const sendConfirmationCode = async (ctx) => {
  try {
    await orderServices.sendConfirmationCode(ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Confirmation code successfully sent',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const confirmCode = async (ctx) => {
  try {
    await orderServices.confirmCode(ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Confirmation code successfully matched',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const finish = async (ctx) => {
  try {
    await orderServices.finish(ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Order successfully finished',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  create,
  getOrders,
  confirm,
  sendConfirmationCode,
  confirmCode,
  finish,
};
