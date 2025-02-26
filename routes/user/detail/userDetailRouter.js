const express = require('express');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { updateProfile } = require('../../../controllers/user/detail/userDetailRouter');
const userDetailRouter = express();

userDetailRouter.put('/updateProfile', verifyTokenAndSetUserId, updateProfile);

module.exports = userDetailRouter;