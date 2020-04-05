const Router = require('koa-router');
const Koa = require('koa');
const config = require('config');

const app = new Koa();
const router = new Router({
  prefix: '/api',
});
require('./src/middleware/index')(app);

const accountsRouter = require('./src/accounts/router');
const authorsRouter = require('./src/authors/router');

router.use(accountsRouter.routes());
router.use(authorsRouter.routes());
app.use(router.routes());

require('./src/schedule/deleteExpiredToken');

module.exports = app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`SERVER is listening on port: ${config.port}`);
});
