const Services = require('./services');

const search = async (ctx) => {
  try {
    const books = await Services.search(ctx.params);
    ctx.body = books;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  search,
};
