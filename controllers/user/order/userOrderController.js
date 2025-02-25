const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { productIds } = req.body;
  
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ error: 'An array of productIds is required.' });
  }
  
  try {
    const productCount = productIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});
    
    const uniqueProductIds = Object.keys(productCount).map(Number);
        const products = await Product.find({ productId: { $in: uniqueProductIds } });
    
    if (products.length !== uniqueProductIds.length) {
      const foundIds = products.map(p => p.productId);
      const missingIds = uniqueProductIds.filter(id => !foundIds.includes(id));
      return res.status(404).json({ error: 'Some products not found', missing: missingIds });
    }
    
    const orderItems = products.map(product => {
      const quantity = productCount[product.productId] || 1;
      const productImg = (product.images && product.images.length > 0) ? product.images[0] : '';
      const productTitle = product.title;
      const productDescription = product.description || product.mainDescription || '';
      const productPrice = Number(product.price);
      
      if (isNaN(productPrice)) {
        throw new Error(`Invalid product price for productId ${product.productId}`);
      }
      
      return {
        productId: product.productId,
        productImg,
        productTitle,
        productDescription,
        productPrice,
        quantity
      };
    });
    
    const totalOrderPrice = orderItems.reduce(
      (sum, item) => sum + item.productPrice * item.quantity, 
      0
    );
    
    const newOrder = new Order({
      items: orderItems,
      userId: req.user.id,
      totalOrderPrice
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
