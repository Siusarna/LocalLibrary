const Router = require('koa-router');
const Koa = require('koa');
const config = require('config');

const accountsRouter = require('./src/accounts/router');

const app = new Koa();
const router = new Router({
  prefix: "/api",
});

router.use(accountsRouter.routes());
app.use(router.routes());

module.exports = app.listen(config.port, () => {
  console.log(`SERVER is listening on port: ${config.port}`);
});
