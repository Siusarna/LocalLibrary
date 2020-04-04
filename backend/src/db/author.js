const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('author', (table) => {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.date('yearOfBirthday');
    table.date('yearOfDeath');
  });
}

start();
