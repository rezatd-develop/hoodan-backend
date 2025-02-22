const express = require('express');
const publicRouter = express();
const authRouter = require('./auth/authRouter');
const sliderRouter = require('./slider/sliderRouter');
const classRouter = require('./class/classRouter');

publicRouter.use('/auth', authRouter);
publicRouter.use('/sliders', sliderRouter);
publicRouter.use('/classes', classRouter);

module.exports = publicRouter;