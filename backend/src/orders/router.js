const Router = require('koa-router');
const ordersControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/orders',
});

router.use(checkAuth);
router.post('/create', validation.create, ordersControllers.create);
router.get('/', ordersControllers.getOrders);

router.use(checkAccess);
router.put('/confirm', validation.confirm, ordersControllers.confirm);
router.post('/confirmationCode', validation.sendConfirmationCode, ordersControllers.sendConfirmationCode);
router.post('/confirmCode', validation.confirmCode, ordersControllers.confirmCode);
router.post('/finish', validation.finish, ordersControllers.finish);

module.exports = router;
