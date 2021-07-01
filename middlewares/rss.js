const RSS = require('rss');

const feed = new RSS({
  title: 'Новости ГБОУ СОШ 390',
  description: 'Лента новостей и событий школы №390 Санкт-Петербурга',
  feed_url: 'http://localhost:3030/rss.xml',
  site_url: 'http://example.com',
  language: 'ru',
  categories: ['Важное', 'Новости'],
  pubDate: 'July 1, 2021 13:36:00 +0000'
});

module.exports = {
  feed
};
