const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.route('/stego').get(messageController.GetMeassage);
//acces only by login user and only user
router.use(authController.protect, authController.restrictTo('user'));
router
  .route('/')
  .post(messageController.stego, messageController.createMassege)
  .get(messageController.GetAllMassege);

router.route('/:id').delete(messageController.deleteMassege);

module.exports = router;
