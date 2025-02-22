const express = require('express');
const authRouter = express.Router();
const authController = require('../../../controllers/public/auth/publicAuthController');

authRouter.post('/phone', authController.getPhone);
authRouter.post('/verify', authController.verifyOtp);
authRouter.post('/register', authController.registerUser);

module.exports = authRouter;