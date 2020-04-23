const Router = require('koa-router');
const ordersControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/orders',
});

router.post('/create', checkAuth, validation.create, ordersControllers.create);
router.get('/', checkAuth, ordersControllers.getOrders);
router.put('/confirm', checkAuth, checkAccess, ordersControllers.confirm);
router.get('/confirmationCode', checkAuth, checkAccess, ordersControllers.sendConfirmationCode);

module.exports = router;
