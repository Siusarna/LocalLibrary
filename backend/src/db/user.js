const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('email');
    table.string('password');
    table.string('salt');
    table.string('photo');
    table.string('firstName');
    table.string('lastName');
    table.string('city');
    table.string('address');
    table.integer('age');
    table.string('phone');
    table.integer('telegramId');
    table.enum('role', ['customer', 'librarian'])
      .defaultTo('customer');
    table.timestamp('createdAt')
      .defaultTo(knex.fn.now());
  });
}

start();
