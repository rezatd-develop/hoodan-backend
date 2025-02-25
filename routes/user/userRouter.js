const express = require('express');
const userCartRouter = require('./cart/userCartRouter');
const userOrderRouter = require('./order/userOrderRouter');
const userDetailRouter = require('./detail/userDetailRouter');
const userRouter = express();

userRouter.use('/cart', userCartRouter);
userRouter.use('/order', userOrderRouter);
userRouter.use('/detail', userDetailRouter);

module.exports = userRouter;