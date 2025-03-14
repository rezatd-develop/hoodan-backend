const express = require('express');
const adminOrderRouter = require('./order/adminOrderRouter');
const adminProductRouter = require('./product/adminProductRouter');
const adminUserRouter = require('./user/adminUserRouter');
const adminBlogRouter = require('./blog/adminBlogRouter');
const adminRouter = express();

adminRouter.use('/order', adminOrderRouter);
adminRouter.use('/product', adminProductRouter);
adminRouter.use('/user', adminUserRouter);
adminRouter.use('/blog', adminBlogRouter);

module.exports = adminRouter;