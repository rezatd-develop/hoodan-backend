const express = require('express');
const userCartRouter = express.Router();
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const { getCart, modifyCart, removeFromCart } = require('../../../controllers/user/cart/userCartController');

userCartRouter.get('/getCart', verifyTokenAndSetUserId, getCart);
userCartRouter.post('/modifyCart', verifyTokenAndSetUserId, modifyCart);
userCartRouter.delete('/removeFromCart/:productId', verifyTokenAndSetUserId, removeFromCart);

module.exports = userCartRouter;
