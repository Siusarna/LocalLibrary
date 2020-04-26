const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('order', (table) => {
    table.increments('id');
    table.integer('bookId');
    table.foreign('bookId').references('book.id');
    table.integer('userId');
    table.foreign('userId').references('users.id');
    table.enum('status', ['In-progress', 'Ready-to-take', 'Cancel', 'Loaned', 'Finished']);
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
  });
}

start();
