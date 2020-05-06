const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('news', (table) => {
    table.increments('id');
    table.string('header');
    table.text('shortDescription');
    table.text('description');
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
    table.string('photo');
  });
}

start();
