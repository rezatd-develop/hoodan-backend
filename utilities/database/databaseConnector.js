const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://156.253.5.235:27017/hoodan', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('Initial MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
