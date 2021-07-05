const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  updateProfile,
  getMyUser,
  logout,
} = require('../controllers/users');

router.get('/me', getMyUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validateUserInfo, updateProfile); // обновляет информацию о пользователе (email и имя)
router.get('/logout', logout); // обновляет информацию о пользователе (email и имя)

module.exports = router;
