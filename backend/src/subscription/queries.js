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

const getSubscriptionsByUserId = (userId) => knex('subscriptions')
  .join('book', 'bookId', 'book.id')
  .join('author', 'book.authorId', 'author.id')
  .select('book.title', 'author.firstName', 'author.lastName', 'subscriptions.createAt')
  .where({ userId });

module.exports = {
  getBookById,
  createSubscription,
  getSubscriptionsByBookIdAndUserId,
  getSubscriptionsByUserId,
};
