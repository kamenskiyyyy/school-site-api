const NewsItem = require('../models/news');
const ValidationError = require('../errors/ValidationError');
const { feed } = require('../middlewares/rss');

const getNews = (req, res, next) => {
  NewsItem.find()
    .then((news) => res.status(200)
      .send(news))
    .catch(next);
};

const createNewsItem = (req, res, next) => {
  const {
    title,
    description,
    link,
    categories,
    author,
    date
  } = req.body;
  NewsItem.create({
    title,
    description,
    link,
    categories,
    author,
    date
  })
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

const getRssFeed = (req, res, next) => {
  NewsItem.find()
    .then((res) => {
      res.map((item) => {
        feed.item({
          title: item.title,
          description: item.description,
          url: item.url,
          categories: item.categories,
          author: item.author,
          date: item.date,
        });
      });
    })
    .then(() => {
      const xmlFeed = feed.xml();
      res.type('application/rss+xml', 'charset=utf-8')
        .send(xmlFeed);
    });
};

module.exports = {
  getNews,
  createNewsItem,
  getRssFeed
};