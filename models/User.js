const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: '',
      trim: true,
    },

    firstName: {
      type: String,
      default: '',
    },

    lastName: {
      type: String,
      default: '',
    },

    address: {
      type: String,
      default: '',
    },

    postalCode: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);