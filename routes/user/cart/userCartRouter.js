const express = require('express');
const userCartRouter = express.Router({ mergeParams: true });
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { getCart, getUserCart, modifyCart, removeFromCart } = require('../../../controllers/user/cart/userCartController');

userCartRouter.get('/getCart', verifyTokenAndSetUserId, getCart);
userCartRouter.get('/getUserCart', verifyTokenAndSetUserId, getUserCart);
userCartRouter.post('/modifyCart', verifyTokenAndSetUserId, modifyCart);
userCartRouter.delete('/removeFromCart/:productId', verifyTokenAndSetUserId, removeFromCart);

module.exports = userCartRouter;
