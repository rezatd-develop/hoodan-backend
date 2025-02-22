const express = require('express');
const publicRouter = express();
const authRouter = require('./auth/authRouter');

publicRouter.use('/auth', authRouter)

module.exports = publicRouter;