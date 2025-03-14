const express = require('express');
const adminBlogRouter = express();
const { getAllBlogs, getBlogDetail, editBlog, createBlog, removeBlog } = require('../../../controllers/admin/blog/adminBlogController');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');
const { upload } = require('../../../middlewares/uploadMedia/uploadMediaMiddleware');

adminBlogRouter.get('/getAllBlogs', verifyTokenAndSetUserId, verifyAdmin, getAllBlogs);
adminBlogRouter.get('/getBlogDetail', verifyTokenAndSetUserId, verifyAdmin, getBlogDetail);
adminBlogRouter.put('/editBlog', verifyTokenAndSetUserId, verifyAdmin, upload.single('image'), editBlog);
adminBlogRouter.post('/createBlog', verifyTokenAndSetUserId, verifyAdmin, upload.single('image'), createBlog);
adminBlogRouter.delete('/removeBlog', verifyTokenAndSetUserId, verifyAdmin, removeBlog);

module.exports = adminBlogRouter;
