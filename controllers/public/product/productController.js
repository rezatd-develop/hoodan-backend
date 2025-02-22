const Product = require('../../../models/Product');

exports.getProductDetail = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid product id'
    });
  }
  
  try {
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Product not found'
      });
    }
    
    return res.json({
      hasError: false,
      data: product,
      message: 'Product detail retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving product detail'
    });
  }
};

exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.productType) {
    filter.productType = req.query.productType;
  }

  try {
    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);
    
    return res.json({
      hasError: false,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving products'
    });
  }
};
