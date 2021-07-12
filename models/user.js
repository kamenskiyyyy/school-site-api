const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  work: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: "/avatar/default-avatar.png"
  },
  login: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: false,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  subjects: {
    type: mongoose.Schema.Types.Array,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.Array,
    required: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(login, password) {
  return this.findOne({ login })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
