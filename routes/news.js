const { NewsRddFeed } = require('../middlewares/rss');
const router = require('express').Router();

const {
  getNews,
  createNewsItem,
  searchNewsItem,
  getRssFeed
} = require('../controllers/news');

router.get('/', getNews);
router.post('/', createNewsItem);
router.post('/search', searchNewsItem);
router.get('/rss', NewsRddFeed);

module.exports = router;
