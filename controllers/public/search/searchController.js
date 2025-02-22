const ClassModel = require('../../../models/Class');
const BookModel = require('../../../models/Book');
const ArtItemModel = require('../../../models/ArtItem');

exports.searchAll = async (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim() === '') {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Search query is required'
    });
  }
  
  try {
    const regex = new RegExp(q, 'i');

    const [classes, books, artItems] = await Promise.all([
      ClassModel.find({ title: regex }),
      BookModel.find({ title: regex }),
      ArtItemModel.find({ title: regex })
    ]);

    const classesWithType = classes.map(item => ({ ...item.toObject(), type: 'class' }));
    const booksWithType = books.map(item => ({ ...item.toObject(), type: 'book' }));
    const artItemsWithType = artItems.map(item => ({ ...item.toObject(), type: 'artItem' }));

    const results = [...classesWithType, ...booksWithType, ...artItemsWithType];

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
      message: 'Error searching for items'
    });
  }
};
