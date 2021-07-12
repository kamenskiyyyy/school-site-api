const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getAllTeachers = (req, res, next) => {
  User.find({ work: true })
    .select('-work')
    .select('-email')
    .select('-role')
    .then((data) => res.status(200)
      .send(data))
    .catch((err) => next(err))
    .catch(next);
};

const getTeacher = (req, res, next) => {
  User.findById(req.params.id)
    .select('-work')
    .select('-role')
    .orFail(() => {
      throw new NotFoundError('Такой учитель отсутствует');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
    .catch(next);
};

module.exports = {
  getAllTeachers,
  getTeacher,
};
