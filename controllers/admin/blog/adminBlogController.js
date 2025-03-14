const Blog = require('../../../models/Blog');

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
  let { blogId, update } = req.body;

  if (!blogId || !update) {
    return res.status(400).json({ error: 'Blog id and update data are required.' });
  }

  try {
    // Parse update string into JSON
    update = JSON.parse(update);

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: Number(blogId) },
      update,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog, successfulOperation: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog', message: err.message });
  }
};


exports.createBlog = async (req, res) => {
  try {
    // Extract fields from req.body
    let { blogId, update } = req.body;

    if (!blogId || !update) {
      return res.status(400).json({ error: 'Blog ID and update data are required.' });
    }

    // Parse the update JSON string into an object
    update = JSON.parse(update);

    const { title, description, publishDate, author, categories, content } = update;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const parsedCategories = Array.isArray(categories) ? categories : [];
    const formattedPublishDate = publishDate ? new Date(publishDate) : new Date();
    blogId = blogId || Math.floor(1000000 + Math.random() * 900000);

    const existingBlog = await Blog.findOne({ id: Number(blogId) });
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this ID already exists.' });
    }

    const newBlog = new Blog({
      id: blogId,
      title,
      description,
      publishDate: formattedPublishDate,
      author,
      images: req.file ? `http://localhost:3001/${req.file.path}` : [],
      categories: parsedCategories,
      content,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: savedBlog, successfulOperation: true });
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
    res.status(200).json({ message: 'Blog removed successfully', successfulOperation: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove blog', message: err.message });
  }
};
