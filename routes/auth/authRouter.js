const express = require('express');
const router = express.Router();

const authController = require('../../../controllers/public/auth/publicAuthController');

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/register', authController.registerUser);

module.exports = router;