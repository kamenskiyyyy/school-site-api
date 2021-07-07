const router = require('express').Router();
const usersRouter = require('./users');
const newsRouter = require('./news');
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

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;
