const Services = require('./services');

const addReview = async (ctx) => {
  try {
    await Services.addReview(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Review successfully added',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getReviews = async (ctx) => {
  try {
    ctx.body = await Services.getReviews(ctx.params);
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const updateReview = async (ctx) => {
  try {
    await Services.updateReview(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Review successfully updated',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const deleteReview = async (ctx) => {
  try {
    await Services.deleteReview(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Review successfully deleted',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
};
