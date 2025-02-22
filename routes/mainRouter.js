const express = require('express');
const mainRouter = express();
const publicRouter = require('./public/publicRouter');

mainRouter.use('/api/:culture/public', publicRouter);

module.exports = mainRouter;
