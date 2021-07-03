const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token || !access_token.startsWith('Bearer')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = access_token.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

module.exports = auth;
