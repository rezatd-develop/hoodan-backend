const express = require('express');
const adminOrderRouter = require('./order/adminOrderRouter');
const adminProductRouter = require('./product/adminProductRouter');
const adminUserRouter = require('./user/adminUserRouter');
const authRouter = require('../auth/authRouter');
const adminRouter = express();

adminRouter.use('/order', adminOrderRouter);
adminRouter.use('/product', adminProductRouter);
adminRouter.use('/user', adminUserRouter);
adminRouter.use('/auth', authRouter);

module.exports = adminRouter;