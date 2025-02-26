const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    address: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
