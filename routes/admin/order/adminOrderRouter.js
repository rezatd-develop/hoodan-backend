const express = require('express');
const { getAllOrders, getOrderDetail, updateOrder, removeOrder, addOrder } = require('../../../controllers/admin/order/adminOrderController');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const adminOrderRouter = express();

adminOrderRouter.get('/getAllOrders', verifyTokenAndSetUserId, verifyAdmin, getAllOrders);
adminOrderRouter.get('/getOrderDetail', verifyTokenAndSetUserId, verifyAdmin, getOrderDetail);
adminOrderRouter.put('/updateOrder', verifyTokenAndSetUserId, verifyAdmin, updateOrder);
adminOrderRouter.delete('/removeOrder', verifyTokenAndSetUserId, verifyAdmin, removeOrder);
adminOrderRouter.post('/addOrder', verifyTokenAndSetUserId, verifyAdmin, addOrder);

module.exports = adminOrderRouter;