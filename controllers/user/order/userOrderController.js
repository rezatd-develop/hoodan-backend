const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'Product id is required.' });
  }
  
  try {
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    
    const productImg = (product.images && product.images.length > 0) ? product.images[0] : '';
    const productTitle = product.title;
    const productDescription = product.description || product.mainDescription || '';
    
    const productPrice = Number(product.price);
    if (isNaN(productPrice)) {
      return res.status(400).json({ error: 'Invalid product price.' });
    }
    
    const newOrder = new Order({
      productId,
      userId: req.user.id,
      productImg,
      productTitle,
      productDescription,
      productPrice,
      totalOrderPrice: productPrice
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', message: err.message });
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
