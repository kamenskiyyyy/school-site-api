const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  updateProfile,
  logout,
} = require('../controllers/users');

router.patch('/update', validateUserInfo, updateProfile); 
router.get('/logout', logout); 

module.exports = router;
