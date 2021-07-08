const Pages = require('../models/pages');
const Nav = require('../models/nav');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const getPage = (req, res, next) => {
  Pages.find({ link: req.body.url })
    .then((page) => res.status(200)
      .send(page))
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
    nav
  } = req.body;
  Pages.create({
    title,
    description,
    link,
    isPublic,
  })
    .then(() => {
      Nav.create(nav)
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
    .orFail(new NotFoundError('Нет новости с таким Id'))
    .then(() => res.status(200)
      .send('Статья обновлена!'))
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
    navId
  } = req.body;
  Pages.findByIdAndDelete(pageId)
    .orFail(new NotFoundError('Такой страницы не существует'))
    .then(() => {
      Nav.findByIdAndDelete(navId)
        .orFail(new NotFoundError('Такой страницы в меню не существует'));
      res.status(200)
        .send('Страница успешно удалена');
    })
    .catch(next);
};

module.exports = {
  getPage,
  createPage,
  editPage,
  deletePage
};