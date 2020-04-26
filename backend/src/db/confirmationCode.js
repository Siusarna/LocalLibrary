const knex = require('../libs/knex');

async function start() {
  await knex.schema.createTable('confirmationCode', (table) => {
    table.integer('code');
    table.integer('orderId');
    table.foreign('orderId').references('order.id');
    table.timestamp('createAt')
      .defaultTo(knex.fn.now());
  });
}

start();
