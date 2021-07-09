const router = require('express').Router();
const {
  getNewsItem,
  getNews
} = require('../controllers/news');
const { getPage } = require('../controllers/pages');
const { getNav } = require('../controllers/nav');
const { NewsRddFeed } = require('../middlewares/rss');
const { getAllTeachers } = require('../controllers/public');

router.get('/news', getNews);
router.post('/page', getPage);
router.get('/nav', getNav);
router.post('/news/getNew', getNewsItem);
router.get('/teachers', getAllTeachers);
router.get('/rss', NewsRddFeed);

module.exports = router;
