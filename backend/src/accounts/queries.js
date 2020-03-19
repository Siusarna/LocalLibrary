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

module.exports = {
  getUserByEmail,
  insertNewUser,
  updateUserById,
};
