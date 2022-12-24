const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const loginLimiter = require('../middleware/loginLimiter');
const checkAuth = require('../middleware/check-auth');


router.route('/')
    .get(checkAuth, usersController.getAllUsers)
    .delete(usersController.deleteUser);

router.route('/update').patch(checkAuth,usersController.updateUser); // Update user details

router.route('/signup').post(usersController.createNewUser); // Sign-Up new user

router.route('/login').post(loginLimiter, usersController.loginUser); //Login existing user
    
module.exports = router;