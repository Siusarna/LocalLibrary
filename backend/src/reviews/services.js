const queries = require('./queries');

const addReview = async ({ id: userId }, { title, content, bookId }) => {
  const book = await queries.getBookById(bookId);
  if (!book) {
    throw new Error('Trying to add review for non-existing book');
  }
  const [review] = await queries.getReviewByUserIdAndBookId(userId, bookId);
  if (review) {
    throw new Error('You already reviewed this book');
  }
  await queries.addReview(userId, bookId, title, content);
};

const getReviews = async ({ bookId }) => {
  const reviews = await queries.getReviewsInfoByBookId(bookId);
  return reviews;
};

const updateReview = async ({ id: userId }, { id, ...newData }) => {
  const [review] = await queries.getReviewById(id);
  if (!review) {
    throw new Error('This review does not exist');
  }
  if (review.userId !== userId) {
    throw new Error('You have not enough rights to update this review');
  }
  await queries.updateReview(id, newData);
};

const deleteReview = async ({ id: userId, role }, { id }) => {
  const [review] = await queries.getReviewById(id);
  if (!review) {
    throw new Error('This review does not exist');
  }
  if (review.userId !== userId && role !== 'librarian') {
    throw new Error('You have not enough rights to delete this review');
  }
  await queries.deleteReview(id);
};

module.exports = {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
};
