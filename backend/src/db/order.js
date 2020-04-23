const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('order', (table) => {
    table.increments('id');
    table.integer('bookId');
    table.foreign('bookId').references('book.id');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.text('status');
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
  });
}

start();
