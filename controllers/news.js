const NewsItem = require('../models/news');
const ValidationError = require('../errors/ValidationError');

const getNews = (req, res, next) => {
  NewsItem.find({ isPublic: true })
    .then((news) => res.status(200)
      .send(news))
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

const searchNewsItem = (req, res, next) => {
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

module.exports = {
  getNews,
  createNewsItem,
  searchNewsItem,
};
