const router = require('express').Router();

const {
  createNewsItem,
} = require('../controllers/news');

router.post('/create', createNewsItem);

module.exports = router;
