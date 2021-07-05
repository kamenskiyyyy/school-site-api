const { getAllTeachers } = require('../controllers/public');
const router = require('express').Router();

router.get('/teachers', getAllTeachers);

module.exports = router;