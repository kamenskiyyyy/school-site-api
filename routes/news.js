const router = require('express').Router();

const {
  createNewsItem,
  editNewsItem,
  archiveNewsItem,
  deleteNewsItem
} = require('../controllers/news');

router.post('/create', createNewsItem);
router.patch('/edit', editNewsItem);
router.patch('/archive', archiveNewsItem);
router.delete('/delete', deleteNewsItem);

module.exports = router;
