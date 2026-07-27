// require('dotenv').config();

const mongoose = require('mongoose');

// Suppress warning
mongoose.set('strictQuery', true);

console.log(JSON.stringify(process.env.MONGO_URI));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.dir(err, { depth: null });
  }
};

module.exports = connectDB;