const { celebrate, Joi } = require('celebrate');

const urlregexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    position: Joi.string().min(2),
    subjects: Joi.array(),
    category: Joi.array(),
    email: Joi.string().required().email(),
    login: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    role: Joi.string().required(),
    work: Joi.string().required(),
    avatar: Joi.string()
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateUserInfo,
  validateSignUp,
  validateSignIn,
};
