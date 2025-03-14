const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  buttonLabel: { type: String, default: '' },
  buttonAction: { type: String, default: '' }
}, { _id: false });

const sliderSchema = new mongoose.Schema({
  sliderId: { type: Number, required: true, unique: true },
  slides: [slideSchema],
  culture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Slider', sliderSchema);
