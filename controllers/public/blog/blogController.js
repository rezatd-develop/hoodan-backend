const BlogModel = require('../../../models/Blog');

exports.getBlogDetail = async (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  if (isNaN(blogId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid blog id'
    });
  }
  try {
    const blog = await BlogModel.findOne({ id: blogId });
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

  try {
    const blogs = await BlogModel.find().skip(skip).limit(limit);
    const total = await BlogModel.countDocuments();
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
