const Router = require('koa-router');
const booksControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/author',
});

router.post('/', checkAuth, checkAccess, validation.addAuthor, booksControllers.addAuthor);
router.delete('/', checkAuth, checkAccess, booksControllers.deleteAuthor);
router.get('/', booksControllers.getAllAuthors);
router.get('/:id', booksControllers.getAuthor);
router.put('/', checkAuth, checkAccess, validation.updateAuthor, booksControllers.updateAuthor);

module.exports = router;
