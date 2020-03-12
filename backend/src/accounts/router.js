const Router = require('koa-router');
const accControllers = require('./controllers');
// const validation = require('./validation');

const router = new Router({
  prefix: '/accounts',
});

router.post('/sign-in', accControllers.auth);
router.post('/sign-up', accControllers.register);

module.exports = router;
