const router = require('express').Router();

const {
  getNews,
  createNewsItem,
  getRssFeed
} = require('../controllers/news');

router.get('/', getNews);
router.post('/', createNewsItem);
router.get('/rss', getRssFeed);

module.exports = router;
