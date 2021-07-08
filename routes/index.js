const router = require('express').Router();
const usersRouter = require('./users');
const newsRouter = require('./news');
const pagesRouter = require('./pages');
const navRouter = require('./nav');
const publicRouter = require('./public');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.use('/', publicRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/news', newsRouter);
router.use('/pages', pagesRouter);
router.use('/nav', navRouter);

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;
