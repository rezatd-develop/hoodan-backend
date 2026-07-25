const express = require('express');
const authRouter = express.Router({ mergeParams: true });
const authController = require('../../../controllers/public/auth/publicAuthController');

authRouter.post('/phone', authController.sendOtp);
authRouter.post('/verify', authController.verifyOtp);
authRouter.post('/register', authController.registerUser);

module.exports = authRouter;