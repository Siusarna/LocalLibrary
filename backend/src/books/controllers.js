const Services = require('./services');

const addBook = async (ctx) => {
  try {
    const [book] = await Services.addBook(ctx.request.body);
    ctx.body = book;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const deleteBook = async (ctx) => {
  try {
    await Services.deleteBook(ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Book successfully deleted',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getAllBooks = async (ctx) => {
  try {
    ctx.body = await Services.getAllBooks();
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const getBook = async (ctx) => {
  try {
    ctx.body = await Services.getBook(ctx.params);
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const updateBook = async (ctx) => {
  try {
    const [book] = await Services.updateBook(ctx.request.body);
    ctx.body = book;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

module.exports = {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
};
