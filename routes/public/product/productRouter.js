const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProducts, getProductDetail } = require('../../../controllers/public/product/productController');

router.get('/', getProducts);
router.get('/:id', getProductDetail);

module.exports = router;
