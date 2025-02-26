const express = require('express');
const adminBlogRouter = express();
const { getAllBlogs, getBlogDetail, editBlog, createBlog, removeBlog } = require('../../../controllers/admin/blog/adminBlogController');
const { verifyTokenAndSetUserId } = require('../../../middlewares/auth/verifyTokenAndSetUserId');
const verifyAdmin = require('../../../middlewares/auth/verifyAdmin');

adminBlogRouter.get('/en/admin/blogs/getAllBlogs', verifyTokenAndSetUserId, verifyAdmin, getAllBlogs);
adminBlogRouter.get('/en/admin/blogs/getBlogDetail', verifyTokenAndSetUserId, verifyAdmin, getBlogDetail);
adminBlogRouter.put('/en/admin/blogs/editBlog', verifyTokenAndSetUserId, verifyAdmin, editBlog);
adminBlogRouter.post('/en/admin/blogs/createBlog', verifyTokenAndSetUserId, verifyAdmin, createBlog);
adminBlogRouter.delete('/en/admin/blogs/removeBlog', verifyTokenAndSetUserId, verifyAdmin, removeBlog);

module.exports = adminBlogRouter;
