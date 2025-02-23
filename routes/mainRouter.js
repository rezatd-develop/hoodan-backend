const express = require('express');
const mainRouter = express();
const publicRouter = require('./public/publicRouter');
const profileRouter = require('./profile/profileRouter')

mainRouter.use('/api/:culture/public', publicRouter);
mainRouter.use('/api/:culture/profile', profileRouter);

module.exports = mainRouter;
