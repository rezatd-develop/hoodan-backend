const express = require('express');
const adminOrderRouter = require('./order/adminOrderRouter');
const adminProductRouter = require('./product/adminProductRouter');
const adminUserRouter = require('./user/adminUserRouter')
const adminRouter = express();

adminRouter.use('/order', adminOrderRouter);
adminRouter.use('/product', adminProductRouter);
adminRouter.use('/user', adminUserRouter);

module.exports = adminRouter;