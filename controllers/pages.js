const Pages = require('../models/pages');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const getPage = (req, res, next) => {
  Pages.find({ link: req.body.url })
    .then((page) => res.status(200).send(page))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
}

const createPage = (req, res, next) => {
  const {
    title,
    description,
    link,
    isPublic,
  } = req.body;
  Pages.create({
    title,
    description,
    link,
    isPublic,
  })
    .then(() => res.status(200).send('Страница создана!'))
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
  const pageId = req.body.id;
  Pages.findByIdAndDelete(pageId)
    .orFail(new NotFoundError('Такой страницы не существует'))
    .then(() => res.status(200).send("Страница успешно удалена"))
    .catch(next);
};

module.exports = {
  getPage,
  createPage,
  editPage,
  deletePage
}