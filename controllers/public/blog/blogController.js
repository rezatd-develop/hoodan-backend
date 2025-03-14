const BlogModel = require('../../../models/Blog');

exports.getBlogDetail = async (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  const culture = req.params.culture;
  
  if (isNaN(blogId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid blog id'
    });
  }
  
  try {
    const blog = await BlogModel.findOne({ id: blogId, culture });
    if (!blog) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Blog not found'
      });
    }
    return res.json({
      hasError: false,
      data: blog,
      message: 'Blog detail retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving blog detail'
    });
  }
};

exports.getBlogs = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const culture = req.params.culture; // 'en' or 'fa'

  try {
    const blogs = await BlogModel.find({ culture }).skip(skip).limit(limit);
    const total = await BlogModel.countDocuments({ culture });
    return res.json({
      hasError: false,
      data: blogs,
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
      message: 'Error retrieving blogs'
    });
  }
};
