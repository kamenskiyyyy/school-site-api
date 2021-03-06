const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');
const NotFoundError = require('../errors/NotFoundError');

dotenv.config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

// Получить данные о текущем пользователе
const getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Id неверный');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Обновить данные пользователя
const updateProfile = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  if (!name || !email) {
    throw new ValidationError('Введенные данные некорректны');
  }
  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Нет пользователя с таким Id'))
    .then((data) => res.status(200)
      .send(data))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new DuplicateError('Пользователь с таким email уже существует');
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введенные данные некорректны');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const uploadUserAvatar = (req, res) => {
  const file = req.files.avatar;
  const path = file.path.replace(/^public\//, '');
  res.status(200)
    .send({
      url: `/${path}`,
    });
};

// Создание пользователя
const createUser = (req, res, next) => {
  const {
    name, position, subjects, category, email, login, password, role, work, avatar,
  } = req.body;
  if (!login || !email || !name || !password) {
    throw new ValidationError('Данные неверные');
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        position,
        subjects,
        category,
        email,
        login,
        password: hash,
        role,
        work,
        avatar,
      })
        .then(() => {
          res.send('Пользователь создан!');
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new DuplicateError('Пользователь с таким email или логином уже существует');
          } else if (err.name === 'ValidationError' || err.name === 'CastError') {
            throw new ValidationError('Пароль, логин или почта некорректны');
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

// Авторизация
const auth = (req, res, next) => {
  const {
    login,
    password,
  } = req.body;
  return User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '1d' });
      res.status(200)
        .cookie('access_token', `Bearer ${token}`, {
          maxAge: 36000000,
          httpOnly: true,
        })
        .cookie('logged', 'true', {
          maxAge: 36000000,
        })
        .send({
          _id: user._id,
          login: user.login,
          name: user.name,
          email: user.email,
          role: user.role,
          position: user.position,
          subjects: user.subjects,
          avatar: user.avatar,
        });
    })
    .catch((err) => next(err));
};

const logout = (req, res) => {
  res.status(200)
    .cookie('access_token', 'false')
    .cookie('logged', 'false')
    .send('Вы вышли из аккаунта!');
};

module.exports = {
  getMyUser,
  updateProfile,
  uploadUserAvatar,
  createUser,
  login: auth,
  logout,
};
