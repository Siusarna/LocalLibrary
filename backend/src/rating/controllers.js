const ratingServices = require('./services');

const addRating = async (ctx) => {
  try {
    await ratingServices.addRating(ctx.state.user, ctx.request.body);
    ctx.body = {
      status: 'true',
      message: 'Rating successfully added',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getRating = async (ctx) => {
  try {
    ctx.body = await ratingServices.getRating(ctx.state.user, ctx.params);
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  addRating,
  getRating,
};
