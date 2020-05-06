const knex = require('../libs/knex');

const getAllToken = () => knex('token')
  .select('*');

const deleteTokenByUserId = (userId) => knex('token')
  .where({ userId })
  .del();

const getAllSubscription = () => knex('subscriptions')
  .select('*');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const getUserById = (id) => knex('users')
  .select('*')
  .where({ id });

const deleteSubscriptionByUserAndBookId = (bookId, userId) => knex('subscriptions')
  .delete()
  .where({
    bookId,
    userId,
  });

module.exports = {
  getAllToken,
  deleteTokenByUserId,
  getAllSubscription,
  getBookById,
  getUserById,
  deleteSubscriptionByUserAndBookId,
};
