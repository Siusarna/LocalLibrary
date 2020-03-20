const knex = require('../libs/knex');

const getUserByEmail = (email) => knex('users')
  .where({ email })
  .select('*');

const insertNewUser = (user) => knex('users')
  .insert({ ...user })
  .returning(['id', 'firstName', 'lastName', 'photo', 'role']);

const updateUserById = (id, newData) => knex('users')
  .where({ id })
  .update({ ...newData });

const getUserById = (id) => knex('users')
  .where({ id })
  .select('*');

module.exports = {
  getUserByEmail,
  insertNewUser,
  updateUserById,
  getUserById,
};
