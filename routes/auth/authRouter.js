const express = require('express');
const verifyAdmin = require('../../middlewares/auth/verifyAdmin');
const { verifyTokenAndSetUserId } = require('../../middlewares/auth/verifyTokenAndSetUserId');
const accessAccepted = require('../../controllers/auth/authController');
const authRouter = express.Router({ mergeParams: true });

authRouter.get('/isAdmin', verifyTokenAndSetUserId, verifyAdmin, accessAccepted);
authRouter.get('/isUser', verifyTokenAndSetUserId, accessAccepted);

module.exports = authRouter;