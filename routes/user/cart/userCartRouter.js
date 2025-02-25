const express = require('express');
const userCartRouter = express.Router();
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { getCart, addToCart, updateCart, removeFromCart } = require('../../../controllers/user/cart/userCartController');

userCartRouter.get('/', verifyTokenAndSetUserId, getCart);
userCartRouter.post('', verifyTokenAndSetUserId, addToCart);
userCartRouter.put('', verifyTokenAndSetUserId, updateCart);
userCartRouter.delete('/:productId', verifyTokenAndSetUserId, removeFromCart);

module.exports = userCartRouter;
