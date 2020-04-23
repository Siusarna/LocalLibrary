const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('confirmationCode', (table) => {
    table.integer('code');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
  });
}

start();
