const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishDate: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blogs', message: err.message });
  }
};

exports.getBlogDetail = async (req, res) => {
  const { blogId } = req.query;
  if (!blogId) {
    return res.status(400).json({ error: 'Blog id is required.' });
  }
  
  try {
    const blog = await Blog.findOne({ id: Number(blogId) });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blog detail', message: err.message });
  }
};

exports.editBlog = async (req, res) => {
  const { blogId, update } = req.body;
  if (!blogId || !update) {
    return res.status(400).json({ error: 'Blog id and update data are required.' });
  }
  
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { id: Number(blogId) },
      update,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog', message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  let { id, title, description, publishDate, author, images, categories, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  
  try {
    if (!id) {
      id = Math.floor(1000000 + Math.random() * 900000);
    }
    const existingBlog = await Blog.findOne({ id: Number(id) });
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this id already exists.' });
    }
    
    const newBlog = new Blog({
      id,
      title,
      description,
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      author,
      images: images || [],
      categories: categories || [],
      content
    });
    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog', message: err.message });
  }
};

exports.removeBlog = async (req, res) => {
  const { blogId } = req.query;
  if (!blogId) {
    return res.status(400).json({ error: 'Blog id is required.' });
  }
  
  try {
    const deletedBlog = await Blog.findOneAndDelete({ id: Number(blogId) });
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json({ message: 'Blog removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove blog', message: err.message });
  }
};
