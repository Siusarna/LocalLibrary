const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('token', (table) => {
    table.string('tokenId');
    table.integer('userId');
    table.foreign('userId')
      .references('user.id');
    table.timestamp('createdAt')
      .defaultTo(knex.fn.now());
  });
}

start();
