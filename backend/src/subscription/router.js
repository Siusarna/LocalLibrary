const Router = require('koa-router');
const subscriptionControllers = require('./controllers');
const { checkAuth } = require('../middleware/chechAuth');

const router = new Router({
  prefix: '/subscription',
});

router.use(checkAuth);
router.post('/', subscriptionControllers.createSubscription);
// router.get('/', subscriptionControllers.getSubscription);
// router.delete('/', subscriptionControllers.deleteSubscription);

module.exports = router;
