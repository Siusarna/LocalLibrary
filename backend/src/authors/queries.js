const knex = require('../libs/knex');

const getAuthorByName = (firstName, lastName) => knex('author')
  .select('*')
  .where({
    firstName,
    lastName,
  });

const addAuthor = ({
  firstName, lastName, yearOfBirthday, yearOfDeath, photo, description,
}) => knex('author')
  .insert({
    firstName,
    lastName,
    yearOfBirthday,
    yearOfDeath,
    photo,
    description,
  })
  .returning(['id', 'firstName', 'lastName', 'yearOfBirthday', 'yearOfDeath']);

const getAuthorById = (id) => knex('author')
  .select('id', 'firstName', 'lastName', 'yearOfBirthday', 'yearOfDeath', 'photo', 'description')
  .where({ id });

const deleteAuthorById = (id) => knex('author')
  .where({ id })
  .del();

const getAllAuthors = () => knex('author')
  .select('id', 'firstName', 'lastName', 'yearOfBirthday', 'yearOfDeath', 'photo');

const updateAuthorById = (id, newData) => knex('author')
  .where({ id })
  .update({ ...newData })
  .returning(['id', 'firstName', 'lastName', 'yearOfBirthday', 'yearOfDeath', 'photo', 'description']);

const insertNewUser = (user) => knex('users')
  .insert({ ...user })
  .returning(['id', 'firstName', 'lastName', 'photo', 'role']);

module.exports = {
  getAuthorByName,
  addAuthor,
  getAuthorById,
  deleteAuthorById,
  getAllAuthors,
  updateAuthorById,
  insertNewUser,
};