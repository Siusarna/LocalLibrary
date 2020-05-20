const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('review', (table) => {
    table.increments('id');
    table.string('title');
    table.string('content');
    table.integer('bookId');
    table.foreign('bookId').references('book.id');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.timestamp('createdAt')
      .defaultTo(knex.fn.now());
  });
}

start();
