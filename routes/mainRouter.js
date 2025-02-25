const express = require('express');
const mainRouter = express();
const publicRouter = require('./public/publicRouter');
const userRouter = require('./user/userRouter');

mainRouter.use('/api/:culture/public', publicRouter);
mainRouter.use('/api/:culture/user', userRouter);

module.exports = mainRouter;
