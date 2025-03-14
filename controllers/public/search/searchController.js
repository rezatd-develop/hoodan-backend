const Product = require('../../../models/Product');

exports.searchAll = async (req, res) => {
  const { q } = req.query;
  const culture = req.params.culture; 

  if (!q || q.trim() === '') {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Search query is required'
    });
  }

  try {
    const regex = new RegExp(q, 'i');
    const results = await Product.find({ title: regex, culture });

    return res.json({
      hasError: false,
      data: results,
      message: 'Search results retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error searching for products'
    });
  }
};
