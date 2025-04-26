const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'MONGO_URI=mongodb://rezatd:098123JUju./hoodan?authSource=hoodan';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
