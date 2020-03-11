const Router = require('koa-router');
const accControllers = require('./controllers');
// const validation = require('./validation');

const router = new Router({
  prefix: '/accounts',
});

router.get('/', accControllers.getProfile);

module.exports = router;
