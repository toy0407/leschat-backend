const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chatsController');


router.route('/').patch(chatsController.sendMessage);
router.route('/').post(chatsController.createChat);
router.route('/').get(chatsController.getAllChats);
router.route('/').delete(chatsController.deleteChat);


module.exports = router;