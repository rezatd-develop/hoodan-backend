const ArtItemModel = require('../../../models/ArtItem');

exports.getArtItemDetail = async (req, res) => {
  const artItemId = parseInt(req.params.id, 10);
  if (isNaN(artItemId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid art item id'
    });
  }

  try {
    const artItem = await ArtItemModel.findOne({ artItemId });
    if (!artItem) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Art item not found'
      });
    }
    return res.json({
      hasError: false,
      data: artItem,
      message: 'Art item detail retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving art item detail'
    });
  }
};

exports.getArtItems = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const artItems = await ArtItemModel.find().skip(skip).limit(limit);
    const total = await ArtItemModel.countDocuments();

    return res.json({
      hasError: false,
      data: artItems,
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
      message: 'Error retrieving art items'
    });
  }
};
