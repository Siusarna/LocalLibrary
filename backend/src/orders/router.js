const Router = require('koa-router');
const ordersControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');

const router = new Router({
  prefix: '/orders',
});

router.post('/create', checkAuth, validation.create, ordersControllers.create);

module.exports = router;
