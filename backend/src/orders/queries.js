const knex = require('../libs/knex');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const getOrdersByUserId = (userId) => knex('order')
  .select('*')
  .where({ userId });

const createOrder = (userId, bookId, status) => knex('order')
  .insert({
    userId,
    bookId,
    status,
  });

module.exports = {
  getBookById,
  getOrdersByUserId,
  createOrder,
};
