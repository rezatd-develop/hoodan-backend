const BookModel = require('../../../models/Book');

exports.getBookDetail = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid book id'
    });
  }

  try {
    const bookItem = await BookModel.findOne({ bookId });
    if (!bookItem) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Book not found'
      });
    }
    return res.json({
      hasError: false,
      data: bookItem,
      message: 'Book detail retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving book detail'
    });
  }
};

exports.getBooks = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const books = await BookModel.find().skip(skip).limit(limit);
    const total = await BookModel.countDocuments();

    return res.json({
      hasError: false,
      data: books,
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
      message: 'Error retrieving books'
    });
  }
};
