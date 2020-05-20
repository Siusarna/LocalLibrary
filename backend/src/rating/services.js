const queries = require('./queries');

const addRating = async (user, { bookId, rating: newRating }) => {
  const [book] = await queries.getBookById(bookId);
  if (!book) {
    throw new Error('Book with this id not found');
  }
  const [rating] = await queries.getRatingByUserIdAndBookId(user.id, bookId);
  if (rating) {
    await queries.updateRatingUserIdAndBookId(user.id, bookId, newRating);
  } else {
    await queries.addRating(user.id, bookId, newRating);
  }
};

const getRating = async (user, { bookId }) => {
  const [rating] = queries.getRatingByUserIdAndBookId(user.id, bookId);
  if (!rating) {
    throw new Error('You haven\'t rated this book yet');
  }
  return rating;
};

module.exports = {
  addRating,
  getRating,
};
