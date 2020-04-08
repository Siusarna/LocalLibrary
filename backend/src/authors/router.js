const Router = require('koa-router');
const authorsControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/authors',
});

router.post('/', checkAuth, checkAccess, validation.addAuthor, authorsControllers.addAuthor);
router.delete('/', checkAuth, checkAccess, authorsControllers.deleteAuthor);
router.get('/', authorsControllers.getAllAuthors);
router.get('/:id', authorsControllers.getAuthor);
router.put('/', checkAuth, checkAccess, validation.updateAuthor, authorsControllers.updateAuthor);

module.exports = router;
