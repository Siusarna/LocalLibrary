const Router = require('koa-router');
const ratingControllers = require('./controllers');
const { checkAuth } = require('../middleware/chechAuth');
const { checkRating } = require('./validation/checkRating');

const router = new Router({
  prefix: '/rating',
});

router.use(checkAuth);
router.post('/', checkRating, ratingControllers.addRating);
router.get('/:bookId', ratingControllers.getRating);

module.exports = router;
