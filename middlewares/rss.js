const RSS = require('rss');
const NewsItem = require('../models/news');

const NewsRddFeed = (req, res, next) => {
  const feed = new RSS({
    title: 'Новости ГБОУ СОШ 390',
    description: 'Лента новостей и событий школы №390 Санкт-Петербурга',
    feed_url: 'https://api.school-390.kamenev.tech/rss',
    site_url: 'https://school-390.kamenev.tech',
    language: 'ru',
    pubDate: 'July 1, 2021 13:36:00 +0000',
  });

  NewsItem.find({ isPublic: true })
    .then((result) => {
      result.reverse().map((item) => feed.item({
        title: item.title,
        description: item.description,
        guid: `https://school-390.kamenev.tech${item.guid}`,
        author: item.author,
        date: item.date,
      }));
    })
    .then(() => {
      const xmlFeed = feed.xml();
      res.type('application/rss+xml', 'charset=utf-8').send(xmlFeed);
    })
    .catch(next);
};

module.exports = {
  NewsRddFeed,
};
