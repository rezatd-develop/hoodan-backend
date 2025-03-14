const express = require('express');
const mainRouter = express.Router({ mergeParams: true });
const publicRouter = require('./public/publicRouter');
const userRouter = require('./user/userRouter');
const adminRouter = require('./admin/adminRouter');
const authRouter = require('./auth/authRouter');

mainRouter.use('/api/:culture/public', publicRouter);
mainRouter.use('/api/:culture/user', userRouter);
mainRouter.use('/api/:culture/admin', adminRouter);
mainRouter.use('/api/:culture/auth', authRouter);

module.exports = mainRouter;
