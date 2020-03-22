const Router = require('koa-router');
const accControllers = require('./controllers');
const validation = require('./validation/index');
const { checkAuth } = require('../middleware/chechAuth');

const router = new Router({
  prefix: '/accounts',
});

router.post('/sign-in', validation.auth, accControllers.auth);
router.post('/sign-up', validation.register, accControllers.register);
router.post('/forgotPassword', validation.forgotPassword, accControllers.forgotPassword);
router.put('/changePassword', checkAuth, validation.changePassword, accControllers.changePassword);

router.get('/profile', checkAuth, accControllers.profile);
router.put('/profile', checkAuth, validation.updateProfile, accControllers.updateProfile);
router.put('/photo', checkAuth, validation.updatePhoto, accControllers.updatePhoto);
router.get('/logout', checkAuth, accControllers.logout);

module.exports = router;
