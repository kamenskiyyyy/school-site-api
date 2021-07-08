const router = require('express').Router();

const {
  createPage,
  editPage,
  deletePage
} = require('../controllers/pages');

router.post('/create', createPage);
router.patch('/edit', editPage);
router.delete('/delete', deletePage);

module.exports = router;
