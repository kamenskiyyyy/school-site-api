const User = require('../models/user');

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

module.exports = {
  getAllTeachers,
};
