const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  publishDate: { type: Date },
  author: { type: String },
  images: [{ type: String }],
  categories: [{ type: String }],
  content: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
