const NewsItem = require('../models/news');
const ValidationError = require('../errors/ValidationError');
const { NewsRddFeed } = require('../middlewares/rss');

const getNews = (req, res, next) => {
  NewsItem.find()
    .then((news) => res.status(200).send(news))
    .catch(next);
};

const createNewsItem = (req, res, next) => {
  const { title, description, guid, categories, author, date } = req.body;
  NewsItem.create({ title, description, guid, categories, author, date })
    .then((item) => res.status(200).send(item))
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
  NewsItem.findById(req.body.id)
    .then((item) => res.status(200).send(item))
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
  searchNewsItem
};