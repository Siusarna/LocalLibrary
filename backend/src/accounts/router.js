const Router = require('koa-router');
const accControllers = require('./controllers');
const validation = require('./validation/index');

const router = new Router({
  prefix: '/accounts',
});

router.post('/sign-in', validation.auth, accControllers.auth);
router.post('/sign-up', validation.register, accControllers.register);

module.exports = router;
