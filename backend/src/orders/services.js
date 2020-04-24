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

const confirm = async ({ orderId, confirmation, comment }) => {
  const [order] = await queries.getOrderById(orderId);
  if (!order) {
    throw new Error('Order with this id not found');
  }
  if (confirmation) {
    await queries.updateOrderStatus(orderId, 'Ready-to-take', comment);
  } else {
    await queries.updateOrderStatus(orderId, 'Cancel', comment);
  }
  // send notification
};

const sendConfirmationCode = async ({ orderId }) => {
  const [order] = await queries.getOrderById(orderId);
  if (!order) {
    throw new Error('Order with this id not found');
  }
  if (order.status !== 'Ready-to-take') {
    throw new Error('This order haven\'t status "Ready-to-take"');
  }
  const confirmationCode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  await queries.addConfirmationCode(orderId, confirmationCode);
  // send notification
};

const confirmCode = async ({ orderId, code }) => {
  const [confirmationCode] = await queries.getCodeByOrderId(orderId);
  if (!confirmationCode) {
    throw new Error('Confirmation code for this order id not found');
  }
  if (confirmationCode.code !== code) {
    throw new Error('Incorrect code');
  }
  await queries.deleteConfirmationCode(orderId);
  await queries.updateOrderStatus(orderId, 'Loaned');
};

module.exports = {
  create,
  getOrders,
  confirm,
  sendConfirmationCode,
  confirmCode,
};
