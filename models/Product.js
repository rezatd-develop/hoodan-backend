const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  productType: { 
    type: String, 
    enum: ['class', 'book', 'artItem'], 
    required: true 
  },
  title: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String }, 

  classSeries: { type: String },
  primaryDescription: { type: String },
  secondDescription: { type: String },
  thirdDescription: { type: String },
  price: { type: String },
  FaqOneKey: { type: String },
  FaqOneValue: { type: String },
  FaqTwoKey: { type: String },
  FaqTwoValue: { type: String },
  FaqThreeKey: { type: String },
  FaqThreeValue: { type: String },
  FaqFourKey: { type: String },
  FaqFourValue: { type: String },
  detailOneKey: { type: String },
  detailOneValue: { type: String },
  detailTwoKey: { type: String },
  detailTwoValue: { type: String },
  detailThreeKey: { type: String },
  detailThreeValue: { type: String },
  mainDescription: { type: String },

  author: { type: String },
  publishDate: { type: Date },
  categories: [{ type: String }],
  content: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
