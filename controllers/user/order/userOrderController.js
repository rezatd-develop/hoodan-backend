const Order = require('../../../models/Order');
const Product = require('../../../models/Product');
const Cart = require('../../../models/Cart'); // Import Cart model

exports.createOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const userId = req.user.id;
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
        quantity: order.quantity
      });
    }

    const newOrder = new Order({
      items: orderItems,
      userId,
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
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve orders', message: err.message });
  }
};
