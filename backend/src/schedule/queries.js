const knex = require('../libs/knex');

const getAllToken = () => knex('token')
  .select('*');

const deleteTokenByUserId = (userId) => knex('token')
  .where({ userId })
  .del();

module.exports = {
  getAllToken,
  deleteTokenByUserId,
};
