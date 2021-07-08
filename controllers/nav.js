const Nav = require('../models/nav');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getNav = (req, res, next) => {
  Nav.find()
    .then((nav) => res.status(200).send(nav))
    .catch(next);
};

const createNavManual = (req, res, next) => {
  Nav.create(req.body)
    .then(() => res.status(200).send('Ссылка успешно создана!'))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Id неверный');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deleteNavManual = (req, res, next) => {
  const { id } = req.body;
  Nav.findByIdAndDelete(id)
    .orFail(new NotFoundError('Такой ссылки нет в навигации'))
    .then(() => res.status(200).send("Ссылка удалена"))
    .catch(next);
};

module.exports = {
  getNav,
  createNavManual,
  deleteNavManual
};