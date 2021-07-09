const NewsItem = require('../models/news');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const getNews = (req, res, next) => {
  NewsItem.find({ isPublic: true })
    .then((news) => res.status(200)
      .send(news))
    .catch(next);
};

const getNewsItem = (req, res, next) => {
  const { url } = req.body;
  NewsItem.find({ guid: url })
    .then((item) => res.status(200)
      .send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const createNewsItem = (req, res, next) => {
  const {
    title,
    categories,
    isPublic,
    description,
    guid,
    author,
    date,
  } = req.body;
  NewsItem.create({
    title,
    categories,
    isPublic,
    description,
    guid,
    author,
    date,
  })
    .then(() => res.status(200)
      .send('Статья добавлена!'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const editNewsItem = (req, res, next) => {
  const {
    id,
    title,
    categories,
    isPublic,
    description,
    guid,
    author,
    date,
  } = req.body;
  NewsItem.findByIdAndUpdate(id, {
    title,
    categories,
    isPublic,
    description,
    guid,
    author,
    date
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

const archiveNewsItem = (req, res, next) => {
  NewsItem.findByIdAndUpdate(req.body.id, { isPublic: false }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Нет новости с таким Id'))
    .then(() => res.status(200))
    .catch(next);
};

const deleteNewsItem = (req, res, next) => {
  NewsItem.findByIdAndDelete(req.body.id)
    .orFail(new NotFoundError('Нет новости с таким Id'))
    .then(() => res.status(200))
    .catch(next);
};

module.exports = {
  getNews,
  createNewsItem,
  editNewsItem,
  getNewsItem,
  archiveNewsItem,
  deleteNewsItem
};
