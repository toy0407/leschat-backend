const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageController');
// const chatsController = require('../controllers/chatsController');

router.route('/').get(messageController.getMessages);
router.route('/').delete(messageController.deleteMessage);
// router.route('/').post(chatsController.sendMessage);






module.exports = router;