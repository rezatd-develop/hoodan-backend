const Order = require('../../../models/Order');

exports.getAllOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const skip = (page - 1) * limit;

        const orders = await Order.find()
            .sort({ orderRegistrationTime: -1 })
            .skip(skip)
            .limit(limit);

        const totalOrders = await Order.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        res.status(200).json({
            orders,
            currentPage: page,
            totalPages,
            totalOrders
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve orders', message: err.message });
    }
};


exports.getOrderDetail = async (req, res) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.status(400).json({ error: 'Order id is required.' });
    }

    try {
        const order = await Order.findOne({ orderId: Number(orderId) });
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve order detail', message: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    const { orderId, update } = req.body;
    if (!orderId || !update) {
        return res.status(400).json({ error: 'Order id and update data are required.' });
    }

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: Number(orderId) },
            update,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order', message: err.message });
    }
};

exports.removeOrder = async (req, res) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.status(400).json({ error: 'Order id is required.' });
    }

    try {
        const deleted = await Order.findOneAndDelete({ orderId: Number(orderId) });
        if (!deleted) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order removed successfully', hasError: false });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove order', message: err.message });
    }
};

exports.addOrder = async (req, res) => {
    const { productId, userId, productImg, productTitle, productDescription, productPrice, totalOrderPrice, orderStatus } = req.body;

    if (!productId || !userId || !productImg || !productTitle || !productPrice || !totalOrderPrice) {
        return res.status(400).json({ error: 'Missing required order fields.' });
    }

    try {
        const newOrder = new Order({
            productId,
            userId,
            productImg,
            productTitle,
            productDescription: productDescription || '',
            productPrice,
            totalOrderPrice,
            orderStatus: orderStatus !== undefined ? orderStatus : 0
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order added successfully', orderId: savedOrder.orderId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add order', message: err.message });
    }
};
