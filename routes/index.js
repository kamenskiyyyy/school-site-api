const router = require('express').Router();
const multiparty = require('connect-multiparty');
const usersRouter = require('./users');
const newsRouter = require('./news');
const pagesRouter = require('./pages');
const navRouter = require('./nav');
const publicRouter = require('./public');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { login, createUser, uploadUserAvatar } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/validation');

const MultipartyMiddleware = multiparty({ uploadDir: './public/avatar' });

router.post('/signin', validateSignIn, login);
router.use('/', publicRouter);

router.use(auth);
router.post('/create-user', validateSignUp, createUser);
router.post('/create-user/upload-avatar', MultipartyMiddleware, uploadUserAvatar);
router.use('/users', usersRouter);
router.use('/news', newsRouter);
router.use('/pages', pagesRouter);
router.use('/nav', navRouter);

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;
