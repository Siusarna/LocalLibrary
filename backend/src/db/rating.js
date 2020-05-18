const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('rating', (table) => {
    table.integer('bookId');
    table.foreign('bookId').references('book.id');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.integer('value');
  });
}

start();
