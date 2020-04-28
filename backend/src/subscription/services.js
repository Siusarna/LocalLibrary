const queries = require('./queries');

const createSubscription = async (user, { bookId }) => {
  const [book] = await queries.getBookById(bookId);
  if (!book) {
    throw new Error('Book with this id not found');
  }
  if (book.amount !== 0) {
    throw new Error('This book is available');
  }
  const [subscriptions] = await queries.getSubscriptionsByBookIdAndUserId(user.id, bookId);
  if (subscriptions) {
    throw new Error('Your subscription on this book already exist');
  }
  await queries.createSubscription(user.id, bookId);
};

const getSubscription = async ({ id }) => queries.getSubscriptionsByUserId(id);

module.exports = {
  createSubscription,
  getSubscription,
};
