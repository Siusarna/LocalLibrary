const Services = require('./services');

const addAuthor = async (ctx) => {
  try {
    const [author] = await Services.addAuthor(ctx.request.body);
    ctx.body = author;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const deleteAuthor = async (ctx) => {
  try {
    await Services.deleteAuthor(ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Author successfully deleted',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getAllAuthors = async (ctx) => {
  try {
    const authors = await Services.getAllAuthors();
    ctx.body = {
      data: authors,
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getAuthor = async (ctx) => {
  try {
    const [author] = await Services.getAuthor(ctx.params);
    ctx.body = author;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const updateAuthor = async (ctx) => {
  try {
    const [author] = await Services.updateAuthor(ctx.request.body);
    ctx.body = author;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
};