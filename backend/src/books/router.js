const Router = require('koa-router');
const booksControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/books',
});

router.post('/', checkAuth, checkAccess, validation.addBook, booksControllers.addBook);
router.delete('/', checkAuth, checkAccess, booksControllers.deleteBook);
router.get('/', booksControllers.getAllBooks);
router.get('/:id', booksControllers.getBook);
router.put('/', checkAuth, checkAccess, validation.updateBook, booksControllers.updateBook);

module.exports = router;
