const knex = require('../libs/knex');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const addReview = (userId, bookId, title, content) => knex('review')
  .insert({
    userId,
    bookId,
    title,
    content,
  });

const getReviewsInfoByBookId = (bookId) => knex('review')
  .join('users', 'users.id', 'review.userId')
  // eslint-disable-next-line func-names
  .leftJoin('rating', function () {
    this
      .on('rating.userId', 'review.userId')
      .on('rating.bookId', 'review.bookId');
  })
  .select('review.title as title', 'review.content as content', 'review.createdAt as createdAt',
    'users.firstName as firstName', 'users.lastName as lastName', 'users.photo as photo',
    'rating.value as rating')
  .where({
    'review.bookId': bookId,
  });

const getReviewByUserIdAndBookId = (userId, bookId) => knex('review')
  .select('*')
  .where({
    userId,
    bookId,
  });

const getReviewById = (id) => knex('review')
  .select('*')
  .where({ id });

const updateReview = (id, newData) => knex('review')
  .update({ ...newData })
  .where({ id });

const deleteReview = (id) => knex('review')
  .delete()
  .where({ id });

module.exports = {
  getBookById,
  addReview,
  getReviewsInfoByBookId,
  getReviewByUserIdAndBookId,
  getReviewById,
  updateReview,
  deleteReview,
};
