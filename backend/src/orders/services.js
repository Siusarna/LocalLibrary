const queries = require('./queries');

const create = async (user, { bookId }) => {
  const [book] = await queries.getBookById(bookId);
  if (!book) {
    throw new Error('This book not found');
  }
  const userOrders = await queries.getNotFinishedOrdersByUserId(user.id);
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

const getOrders = async ({ id, role }) => {
  let orders;
  if (role === 'customer') {
    orders = await queries.getAllUsersOrders(id);
  }
  if (role === 'librarian') {
    orders = await queries.getAllOrders();
  }
  return orders;
};

const confirm = async ({ id, confirmation, comment }) => {
  const [order] = await queries.getOrderById(id);
  if (!order) {
    throw new Error('Order with this id not found');
  }
  if (confirmation) {
    queries.updateOrderStatus(id, 'Completed', comment);
  } else {
    queries.updateOrderStatus(id, 'Cancel', comment);
  }
  // send notification
};

const sendConfirmationCode = async ({ id }) => {
  const [user] = await queries.getUserById(id);
  if (!user) {
    throw new Error('User with this id not found');
  }
  const confirmationCode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  await queries.addConfirmationCode(id, confirmationCode);
};

module.exports = {
  create,
  getOrders,
  confirm,
  sendConfirmationCode,
};
