const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chatsController');


router.route('/').patch(chatsController.sendMessage);
router.route('/').post(chatsController.createChat);


module.exports = router;