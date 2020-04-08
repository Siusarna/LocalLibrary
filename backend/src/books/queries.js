const knex = require('../libs/knex');

const getAuthorByName = (firstName, lastName) => knex('author')
  .select('*')
  .where({
    firstName,
    lastName,
  });

const addBook = ({
  authorId, yearOfPublishing, description, title, isbn, available,
}) => knex('book')
  .insert({
    authorId,
    yearOfPublishing,
    description,
    title,
    isbn,
    available,
  })
  .returning(['*']);

const getBookById = (id) => knex('book')
  .select('*')
  .where({ id });

const deleteBookById = (id) => knex('book')
  .where({ id })
  .del();

const getAllBooks = () => knex('book')
  .join('author', 'authorId', '=', 'author.id')
  .select('book.id', 'authorId', 'author.firstName', 'author.lastName', 'title', 'book.photo', 'rating');

const updateBookById = (id, newData) => knex('book')
  .where({ id })
  .update({ ...newData });

const insertNewUser = (user) => knex('users')
  .insert({ ...user })
  .returning(['id', 'firstName', 'lastName', 'photo', 'role']);

const getBookByIsbn = (isbn) => knex('book')
  .where({ isbn })
  .select('*');

module.exports = {
  getAuthorByName,
  addBook,
  getBookById,
  deleteBookById,
  getAllBooks,
  updateBookById,
  insertNewUser,
  getBookByIsbn,
};
