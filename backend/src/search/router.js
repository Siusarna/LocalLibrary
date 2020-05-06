const Router = require('koa-router');
const { search } = require('./controllers');

const router = new Router({
  prefix: '/search',
});

router.get('/:query', search);

module.exports = router;
