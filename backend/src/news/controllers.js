const Services = require('./services');

const addNews = async (ctx) => {
  try {
    const [news] = await Services.addNews(ctx.request.body);
    ctx.body = news;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const deleteNews = async (ctx) => {
  try {
    await Services.deleteNews(ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'News successfully deleted',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getAllNews = async (ctx) => {
  try {
    ctx.body = await Services.getAllNews();
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getOneNews = async (ctx) => {
  try {
    ctx.body = await Services.getOneNews(ctx.params);
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const updateNews = async (ctx) => {
  try {
    const [news] = await Services.updateNews(ctx.request.body);
    ctx.body = news;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  addNews,
  deleteNews,
  getAllNews,
  getOneNews,
  updateNews,
};
