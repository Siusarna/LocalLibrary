const queries = require('./queries');

const create = async (user, { bookId }) => {
  const [book] = await queries.getBookById(bookId);
  if (!book) {
    throw new Error('This book not found');
  }
  const userOrders = await queries.getOrdersByUserId(user.id);
  if (userOrders.length !== 0) {
    throw new Error('You must finish all orders before create new');
  }
  if (book.amount === 0) {
    throw new Error('This book is currently unavailable');
  }
  if (!user.phone || !user.city || !user.age || !user.firstName || !user.lastName) {
    throw new Error('Please add all information to you profile');
  }
  await queries.createOrder(user.id, bookId, 'In-progress');
};

module.exports = {
  create,
};
