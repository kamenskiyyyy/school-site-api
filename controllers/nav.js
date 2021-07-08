const Nav = require('../models/nav');
const NotFoundError = require('../errors/NotFoundError');

const getNav = (req, res, next) => {
  Nav.find()
    .then((nav) => res.status(200).send(nav))
    .catch(next);
};

const createNavManual = (req, res, next) => {
  const {
    name,
    path,
    dropMenu
  } = req.body;
  Nav.create(name, path, dropMenu)
    .then((nav) => res.status(200)
      .send(nav))
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