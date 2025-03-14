const express = require('express');
const adminProductRouter = express.Router({ mergeParams: true });
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const { getAllProducts, getProductDetail, editProduct, deleteProduct, createProduct } = require('../../../controllers/admin/product/adminProductController');
const { upload } = require('../../../middlewares/uploadMedia/uploadMediaMiddleware');

adminProductRouter.get('/getAllProducts', verifyTokenAndSetUserId, verifyAdmin, getAllProducts);
adminProductRouter.get('/getProductDetail', verifyTokenAndSetUserId, verifyAdmin, getProductDetail);
adminProductRouter.put('/editProduct', verifyTokenAndSetUserId, verifyAdmin, upload.single('image'), editProduct);
adminProductRouter.delete('/deleteProduct', verifyTokenAndSetUserId, verifyAdmin, deleteProduct);
adminProductRouter.post('/createProduct', verifyTokenAndSetUserId, verifyAdmin, createProduct);

module.exports = adminProductRouter;
