const Cart = require('../../../models/Cart');
const Product = require('../../../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(200).json({ userId: req.user.id, items: [] });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve cart', message: err.message });
    }
};

exports.modifyCart = async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
        return res.status(400).json({ error: 'productId and quantity are required.' });
    }

    try {
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        } else {
            if (quantity > 0) {
                cart.items.push({ productId, quantity });
            }
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to modify cart', message: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const productId = Number(req.params.productId);
    if (!productId) {
        return res.status(400).json({ error: 'Product id is required in params.' });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart.' });
        }

        cart.items.splice(itemIndex, 1);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove item from cart', message: err.message });
    }
};
