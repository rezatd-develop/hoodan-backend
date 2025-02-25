const express = require('express');
const userOrderRouter = express();
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { createOrder, getAllOrders } = require('../../../controllers/user/order/userOrderController');

userOrderRouter.post('/createOrder', verifyTokenAndSetUserId, createOrder);
userOrderRouter.get('/getAllOrders', verifyTokenAndSetUserId, getAllOrders);

module.exports = userOrderRouter;