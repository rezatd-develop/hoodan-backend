// require('dotenv').config();

const mongoose = require('mongoose');

// Suppress warning
mongoose.set('strictQuery', true);

console.log('***process.env.MONGO_URI', process.env.MONGO_URI)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;