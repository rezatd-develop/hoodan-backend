const Order = require('../../../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { productId, productImg, productTitle, productDescription, productPrice, totalOrderPrice } = req.body;

    if (!productId || !productImg || !productTitle || productPrice === undefined || totalOrderPrice === undefined) {
      return res.status(400).json({
        hasError: true,
        data: null,
        message: 'Missing required fields'
      });
    }

    const order = new Order({
      productId,
      productImg,
      productTitle,
      productDescription,
      productPrice,
      totalOrderPrice,
      orderRegistrationTime: new Date()
    });

    const savedOrder = await order.save();
    return res.status(201).json({
      hasError: false,
      data: savedOrder,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error creating order'
    });
  }
};

exports.getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const orders = await Order.find().skip(skip).limit(limit);
    const total = await Order.countDocuments();

    return res.json({
      hasError: false,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      message: 'Orders retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving orders'
    });
  }
};
