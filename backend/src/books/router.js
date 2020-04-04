const Router = require('koa-router');
const booksControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');
const { checkAccess } = require('../middleware/checkAccess');

const router = new Router({
  prefix: '/books',
});

router.post('/author', checkAuth, checkAccess, validation.addAuthor, booksControllers.addAuthor);
router.delete('/author', checkAuth, checkAccess, booksControllers.deleteAuthor);
router.get('/author', booksControllers.getAllAuthors);
router.get('/author/:id', booksControllers.getAuthor);
router.put('/author', checkAuth, checkAccess, validation.updateAuthor, booksControllers.updateAuthor);

module.exports = router;
