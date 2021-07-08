const router = require('express').Router();

const { createNavManual, deleteNavManual } = require('../controllers/nav');

router.post('/create', createNavManual);
router.delete('/delete', deleteNavManual);

module.exports = router;