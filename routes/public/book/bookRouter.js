const express = require('express');
const router = express.Router();
const { getBooks, getBookDetail } = require('../../../controllers/public/book/bookController');

router.get('/', getBooks);
router.get('/:id', getBookDetail);

module.exports = router;
