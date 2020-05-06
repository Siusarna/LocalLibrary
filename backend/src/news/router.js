const Router = require('koa-router');
const newsControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/news',
});

router.post('/', checkAuth, checkAccess, validation.addNews, newsControllers.addNews);
router.delete('/', checkAuth, checkAccess, newsControllers.deleteNews);
router.get('/', newsControllers.getAllNews);
router.get('/:id', newsControllers.getOneNews);
router.put('/', checkAuth, checkAccess, validation.updateNews, newsControllers.updateNews);

module.exports = router;
