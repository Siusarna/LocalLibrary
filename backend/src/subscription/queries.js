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
  .select('book.title', 'book.id', 'authorId', 'author.firstName', 'author.lastName', 'subscriptions.createAt')
  .where({ userId });

const deleteSubscription = (userId, bookId) => knex('subscriptions')
  .delete()
  .where({
    userId,
    bookId,
  });

module.exports = {
  getBookById,
  createSubscription,
  getSubscriptionsByBookIdAndUserId,
  getSubscriptionsByUserId,
  deleteSubscription,
};
