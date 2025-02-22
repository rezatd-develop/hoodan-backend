const ClassModel = require('../../../models/Class');

exports.getClassDetail = async (req, res) => {
  const classId = parseInt(req.params.id, 10);
  if (isNaN(classId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid class id'
    });
  }

  try {
    const classItem = await ClassModel.findOne({ classId });
    if (!classItem) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Class not found'
      });
    }
    return res.json({
      hasError: false,
      data: classItem,
      message: 'Class detail retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving class detail'
    });
  }
};

exports.getClasses = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const classes = await ClassModel.find().skip(skip).limit(limit);
    const total = await ClassModel.countDocuments();

    return res.json({
      hasError: false,
      data: classes,
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
      message: 'Error retrieving classes'
    });
  }
};
