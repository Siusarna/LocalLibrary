const config = require('config');
const ui = require('koa2-swagger-ui');

module.exports = ui(config.docs);
