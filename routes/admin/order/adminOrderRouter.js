const express = require('express');
const { getAllOrders, getOrderDetail, updateOrder, removeOrder, addOrder } = require('../../../controllers/admin/order/adminOrderController');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const adminOrderRouter = express();

router.get('/getAllOrders', verifyTokenAndSetUserId, verifyAdmin, getAllOrders);
router.get('/getOrderDetail', verifyTokenAndSetUserId, verifyAdmin, getOrderDetail);
router.put('/updateOrder', verifyTokenAndSetUserId, verifyAdmin, updateOrder);
router.delete('/removeOrder', verifyTokenAndSetUserId, verifyAdmin, removeOrder);
router.post('/addOrder', verifyTokenAndSetUserId, verifyAdmin, addOrder);

module.exports = adminOrderRouter;