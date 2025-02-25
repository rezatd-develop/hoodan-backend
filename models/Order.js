const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  orderId: { type: Number, unique: true },
  productImg: { type: String, required: true },
  productTitle: { type: String, required: true },
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  totalOrderPrice: { type: Number, required: true },
  orderRegistrationTime: { type: Date, default: Date.now }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = Math.floor(1000000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
