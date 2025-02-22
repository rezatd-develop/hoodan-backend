const express = require('express');
const publicRouter = express();
const authRouter = require('./auth/authRouter');
const sliderRouter = require('./slider/sliderRouter');
const classRouter = require('./class/classRouter');
const bookRouter = require('./book/bookRouter');
const artItemRouter = require('./artItem/artItemRouter');
const blogRouter = require('./blog/blogRouter');

publicRouter.use('/auth', authRouter);
publicRouter.use('/sliders', sliderRouter);
publicRouter.use('/classes', classRouter);
publicRouter.use('/books', bookRouter);
publicRouter.use('/artItems', artItemRouter);
publicRouter.use('/blogs', blogRouter);

module.exports = publicRouter;