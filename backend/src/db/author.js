const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('author', (table) => {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.integer('yearOfBirthday');
    table.string('yearOfDeath');
  });
}

start();
