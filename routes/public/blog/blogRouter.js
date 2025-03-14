const express = require('express');
const router = express.Router({ mergeParams: true });
const { getBlogs, getBlogDetail } = require('../../../controllers/public/blog/blogController');

router.get('/', getBlogs);
router.get('/:id', getBlogDetail);

module.exports = router;
