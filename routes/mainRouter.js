const express = require('express');
const mainRouter = express();
const publicRouter = require('./public/publicRouter');
const userRouter = require('./user/userRouter');
const adminRouter = require('./admin/adminRouter')

mainRouter.use('/api/:culture/public', publicRouter);
mainRouter.use('/api/:culture/user', userRouter);
mainRouter.use('/api/:culture/admin', adminRouter);

module.exports = mainRouter;
