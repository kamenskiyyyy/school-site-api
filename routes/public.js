const router = require('express').Router();
const { searchNewsItem } = require('../controllers/news');
const { NewsRddFeed } = require('../middlewares/rss');
const { getNews } = require('../controllers/news');
const { getAllTeachers } = require('../controllers/public');

router.get('/news', getNews);
router.post('/news/getNews', searchNewsItem);
router.get('/public/teachers', getAllTeachers);
router.get('/rss', NewsRddFeed);

module.exports = router;
