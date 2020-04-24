const knex = require('../libs/knex');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const getNotFinishedOrdersByUserId = (userId) => knex('order')
  .select('*')
  .where({ userId })
  .and
  .whereNot({ status: 'Finished' });

const createOrder = (userId, bookId, status) => knex('order')
  .insert({
    userId,
    bookId,
    status,
  });

const getAllOrders = () => knex('order')
  .join('users', 'order.userId', '=', 'users.id')
  .join('book', 'book.id', '=', 'order.bookId')
  .join('author', 'book.authorId', '=', 'author.id')
  .select('order.id',
    knex.raw('users."firstName" as "userFirstName"'),
    knex.raw('users."lastName" as "userLastName"'),
    knex.raw('author."firstName" as "authorFirstName"'),
    knex.raw('author."lastName" as "authorLastName"'),
    'book.title');

const getAllUsersOrders = (userId) => knex('order')
  .join('book', 'book.id', '=', 'order.bookId')
  .join('author', 'book.authorId', '=', 'author.id')
  .where({ userId })
  .select('order.id', 'bookId', knex.raw('author.id as "authorId"'), 'book.title', 'author.firstName',
    'author.lastName', 'book.rating', 'order.status', 'order.createAt');

const getOrderById = (id) => knex('order')
  .where({ id })
  .select('*');

const updateOrderStatus = (id, status, comment) => knex('order')
  .where({ id })
  .update({
    status,
    comment,
  });

const addConfirmationCode = (userId, code) => knex('confirmationCode')
  .insert({
    code,
    userId,
  });

module.exports = {
  getBookById,
  getNotFinishedOrdersByUserId,
  createOrder,
  getAllOrders,
  getAllUsersOrders,
  getOrderById,
  updateOrderStatus,
  addConfirmationCode,
};