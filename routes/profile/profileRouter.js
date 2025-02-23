const express = require('express');
const profileRouter = express();
const profileOrdersRouter = require('./orders/profileOrderRouter');

profileRouter.use('./orders', profileOrdersRouter)

module.exports = profileRouter;