const express = require('express');
const adminOrderRouter = require('./order/adminOrderRouter');
const adminRouter = express();

adminRouter.use('/order', adminOrderRouter);

module.exports = adminRouter;