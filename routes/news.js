const router = require('express').Router();

const {
  createNewsItem,
  editNewsItem
} = require('../controllers/news');

router.post('/create', createNewsItem);
router.patch('/edit', editNewsItem);

module.exports = router;
