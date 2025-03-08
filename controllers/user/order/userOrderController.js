const Order = require('../../../models/Order');
const Product = require('../../../models/Product');
const Cart = require('../../../models/Cart'); // Import Cart model
const moment = require('moment'); // Import moment.js for date formatting
const { translateOrderStatus } = require('../../../utilities/enumTranslations/enumTranslator');

exports.createOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const userId = req.user.id;
    const firstName = req.user.firstName; // Extract first name from token
    const lastName = req.user.lastName;   // Extract last name from token
    const fullName = `${req.user.firstName} ${req.user.lastName}`; // Extract phone number from token
    const phone = req.user.phone; // Extract phone number from token

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ error: 'User information missing from token' });
    }

    let totalOrderPrice = 0;
    let orderItems = [];

    for (const order of orders) {
      const product = await Product.findOne({ productId: order.productid });
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${order.productid} not found` });
      }

      const itemTotalPrice = parseFloat(product.price) * order.quantity;
      totalOrderPrice += itemTotalPrice;

      orderItems.push({
        productId: product.productId,
        productImg: product.images[0] || '',
        productTitle: product.title,
        productDescription: product.description,
        productPrice: parseFloat(product.price),
        quantity: order.quantity,
      });
    }

    const newOrder = new Order({
      items: orderItems,
      userId,
      firstName,
      lastName,
      fullName,
      phone,
      totalOrderPrice
    });

    await newOrder.save();

    // **Remove the ordered items from the cart**
    await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: { $in: orders.map(order => order.productid) } } } },
      { new: true }
    );

    res.status(201).json({ message: 'Order created successfully', order: newOrder, hasError: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });

    const updatedOrders = orders.map(order => ({
      ...order.toObject(),
      orderItems: order.items.map(item => item.productTitle).join(', '),
      orderRegistrationTimeFormatted: moment(order.orderRegistrationTime).format('DD MMM YYYY'),
      orderStatusLabel: translateOrderStatus(order?.orderStatus)
    }));

    res.status(200).json(updatedOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve orders', message: err.message });
  }
};
