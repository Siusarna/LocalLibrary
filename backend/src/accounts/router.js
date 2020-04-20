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

router.use(checkAuth);

router.put('/changePassword', validation.changePassword, accControllers.changePassword);
router.get('/profile', accControllers.profile);
router.put('/profile', validation.updateProfile, accControllers.updateProfile);
router.put('/photo', validation.updatePhoto, accControllers.updatePhoto);
router.get('/logout', accControllers.logout);

module.exports = router;
