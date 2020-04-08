const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('book', (table) => {
    table.increments('id');
    table.integer('authorId');
    table.foreign('authorId').references('author.id');
    table.string('title');
    table.text('description');
    table.string('isbn');
    table.integer('yearOfPublishing');
    table.float('rating');
    table.string('photo');
    table.boolean('available');
  });
}

start();
