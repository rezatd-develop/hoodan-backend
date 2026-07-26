const express = require('express');
const { registerUser, verifyOtp, sendOtp } = require('../../controllers/public/auth/publicAuthController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);

module.exports = router;