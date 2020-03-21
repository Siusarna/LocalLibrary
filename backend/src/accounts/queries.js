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

const getProfileById = (id) => knex('users')
  .where({ id })
  .select('firstName', 'lastName', 'photo', 'role', 'age', 'city', 'phone', 'address');

const deleteTokenByUserId = (userId) => knex('token')
  .where({ userId })
  .del();

module.exports = {
  getUserByEmail,
  insertNewUser,
  updateUserById,
  getUserById,
  getProfileById,
  deleteTokenByUserId,
};
