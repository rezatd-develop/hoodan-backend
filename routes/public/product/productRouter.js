const express = require('express');
const router = express.Router();
const { getProducts, getProductDetail } = require('../../../controllers/public/product/productController');

router.get('/', getProducts);
router.get('/:id', getProductDetail);

module.exports = router;
