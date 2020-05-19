const Router = require('koa-router');
const reviewControllers = require('./controllers');
const checkRequired = require('./validation/checkRequired');
const checkValues = require('./validation/checkValues');
const { checkAuth } = require('../middleware/chechAuth');

const router = new Router({
  prefix: '/reviews',
});

router.post('/', checkAuth, checkRequired, checkValues, reviewControllers.addReview);
router.delete('/', checkAuth, reviewControllers.deleteReview);
router.get('/:bookId', reviewControllers.getReviews);
router.put('/', checkAuth, checkValues, reviewControllers.updateReview);

module.exports = router;
