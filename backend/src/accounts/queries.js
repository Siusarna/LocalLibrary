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
  .select('firstName', 'lastName', 'photo', 'role', 'age', 'city', 'phone', 'address')
  .first();

const deleteTokenByUserId = (userId) => knex('token')
  .where({ userId })
  .del();

const deleteUserByEmail = (email) => knex('users')
  .where({ email })
  .del();

const deleteTokenByUserEmail = (email) => knex('users')
  .where({ email })
  .join('token', 'users.id', '=', 'token.userId')
  .first()
  .then(async (user) => {
    await knex('token')
      .where({ userId: user.id })
      .del();
  });

module.exports = {
  getUserByEmail,
  insertNewUser,
  updateUserById,
  getUserById,
  getProfileById,
  deleteTokenByUserId,
  deleteUserByEmail,
  deleteTokenByUserEmail,
};
