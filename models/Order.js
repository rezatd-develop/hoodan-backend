const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  productImg: { type: String, required: true },
  productTitle: { type: String, required: true },
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  orderId: { type: Number, unique: true },
  totalOrderPrice: { type: Number, required: true },
  orderRegistrationTime: { type: Date, default: Date.now },
  orderStatus: { 
    type: Number, 
    default: 0, 
    enum: [0, 1, 2, 3]
  }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = Math.floor(1000000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
