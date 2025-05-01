const mongoose = require('mongoose');

// Suppress warning and explicitly set behavior:
mongoose.set('strictQuery', true); 
// or:
// mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://156.253.5.235:27017/hoodan', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();
module.exports = connectDB;
