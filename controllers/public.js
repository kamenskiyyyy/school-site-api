const User = require('../models/user');

const getAllTeachers = (req, res, next) => {
  User.find()
    .then((data) => res.status(200)
      .send(data))
    .catch((err) => next(err))
    .catch(next);
};

module.exports = {
  getAllTeachers
};