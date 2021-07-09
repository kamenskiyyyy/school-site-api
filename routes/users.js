const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  updateProfile,
  getMyUser,
  logout,
} = require('../controllers/users');

router.get('/me', getMyUser); 
router.patch('/update', validateUserInfo, updateProfile); 
router.get('/logout', logout); 

module.exports = router;
