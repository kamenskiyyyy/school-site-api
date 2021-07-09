const Pages = require('../models/pages');
const Nav = require('../models/nav');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const getPage = (req, res, next) => {
  const { url } = req.body;
  Pages.find({ link: url })
    .orFail(new NotFoundError('Нет страницы с таким Id'))
    .then((page) => res.status(200).send(page))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const createPage = (req, res, next) => {
  const {
    title,
    description,
    link,
    isPublic,
    idMenu,
    menu
  } = req.body;
  Pages.create({
    title,
    description,
    link,
    isPublic,
  })
    .then(() => {
      Nav.findByIdAndUpdate(idMenu, { dropMenu: menu }, {
        new: true,
        runValidators: true,
      })
        .then(() => res.status(200));
      res.status(200)
        .send('Страница создана!');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const editPage = (req, res, next) => {
  const {
    id,
    title,
    description,
    link,
    isPublic,
  } = req.body;
  Pages.findByIdAndUpdate(id, {
    title,
    description,
    link,
    isPublic,
  }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Нет страницы с таким Id'))
    .then(() => res.status(200)
      .send('Страница обновлена!'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deletePage = (req, res, next) => {
  const {
    pageId,
  } = req.body;
  Pages.findByIdAndDelete(pageId)
    .orFail(new NotFoundError('Такой страницы не существует'))
    .then(() => res.status(200))
    .catch(next);
};

module.exports = {
  getPage,
  createPage,
  editPage,
  deletePage
};