const express = require('express');
const publicRouter = express();
const authRouter = require('./auth/authRouter');
const sliderRouter = require('./slider/sliderRouter');

publicRouter.use('/auth', authRouter);
publicRouter.use('/sliders', sliderRouter);

module.exports = publicRouter;