const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('token', (table) => {
    table.string('tokenId');
    table.integer('userId');
    table.foreign('userId')
      .references('users.id');
    table.timestamp('updatedAt')
      .defaultTo(knex.fn.now());
  });
}

start();
