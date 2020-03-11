const knex = require('../libs/knex');

const getProfile = async (ctx) => {
  ctx.body = await knex.select('*')
    .from('users');
};

module.exports = {
  getProfile,
};
