const knex = require('../libs/knex');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const createSubscription = (userId, bookId) => knex('subscriptions')
  .insert({
    userId,
    bookId,
  });

const getSubscriptionsByBookIdAndUserId = (userId, bookId) => knex('subscriptions')
  .select('*')
  .where({
    userId,
    bookId,
  });

module.exports = {
  getBookById,
  createSubscription,
  getSubscriptionsByBookIdAndUserId,
};
