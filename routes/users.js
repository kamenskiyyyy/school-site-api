const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  getMyUser,
  updateProfile,
  logout,
} = require('../controllers/users');

router.get('/me', getMyUser); // возвращает информацию о пользователе (email и имя)
router.patch('/update', validateUserInfo, updateProfile);
router.get('/logout', logout);

module.exports = router;
