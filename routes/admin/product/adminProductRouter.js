const express = require('express');
const adminProductRouter = express.Router();
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const { getAllProducts, getProductDetail, editProduct, deleteProduct, createProduct } = require('../../../controllers/admin/product/adminProductController');

adminProductRouter.get('/getAllProducts', verifyTokenAndSetUserId, verifyAdmin, getAllProducts);
adminProductRouter.get('/getProductDetail', verifyTokenAndSetUserId, verifyAdmin, getProductDetail);
adminProductRouter.put('/editProduct', verifyTokenAndSetUserId, verifyAdmin, editProduct);
adminProductRouter.delete('/deleteProduct', verifyTokenAndSetUserId, verifyAdmin, deleteProduct);
adminProductRouter.post('/createProduct', verifyTokenAndSetUserId, verifyAdmin, createProduct);

module.exports = adminProductRouter;
