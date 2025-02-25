const express = require('express');
const userCartRouter = require('./cart/userCartRouter');
const userOrderRouter = require('./order/userOrderRouter');
const userRouter = express();

userRouter.use('/cart', userCartRouter);
userRouter.use('/order', userOrderRouter);

module.exports = userRouter;