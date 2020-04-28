const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('subscriptions', (table) => {
    table.integer('bookId');
    table.foreign('bookId').references('book.id');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
  });
}

start();
