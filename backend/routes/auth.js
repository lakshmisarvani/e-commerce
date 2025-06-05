const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

// Get current user (auth check)
router.get('/me', authController.me);

module.exports = router;