const router = require('express').Router();
const {
  searchNewsItem,
  getNews
} = require('../controllers/news');
const { getPage } = require('../controllers/pages');
const { NewsRddFeed } = require('../middlewares/rss');
const { getAllTeachers } = require('../controllers/public');

router.get('/news', getNews);
router.get('/page', getPage);
router.post('/news/getNew', searchNewsItem);
router.get('/public/teachers', getAllTeachers);
router.get('/rss', NewsRddFeed);

module.exports = router;
