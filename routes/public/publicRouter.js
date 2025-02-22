const express = require('express');
const publicRouter = express();
const authRouter = require('./auth/authRouter');
const sliderRouter = require('./slider/sliderRouter');
const blogRouter = require('./blog/blogRouter');
const searchRouter = require('./search/searchRouter');
const productRouter = require('./product/productRouter');

publicRouter.use('/auth', authRouter);
publicRouter.use('/sliders', sliderRouter);
publicRouter.use('/blogs', blogRouter);
publicRouter.use('/search', searchRouter);
publicRouter.use('/products', productRouter);

module.exports = publicRouter;