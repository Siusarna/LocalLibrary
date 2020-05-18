const knex = require('../libs/knex');

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const getRatingByUserIdAndBookId = (userId, bookId) => knex('rating')
  .select('*')
  .where({
    userId,
    bookId,
  });

const addRating = (userId, bookId, rating) => knex('rating')
  .insert({
    userId,
    bookId,
    value: rating,
  });

const updateRatingUserIdAndBookId = (userId, bookId, rating) => knex('rating')
  .where({ userId, bookId })
  .update({ value: rating });


module.exports = {
  getBookById,
  getRatingByUserIdAndBookId,
  addRating,
  updateRatingUserIdAndBookId,
};
