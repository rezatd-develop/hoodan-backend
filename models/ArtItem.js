const mongoose = require('mongoose');

const artItemSchema = new mongoose.Schema({
    classId: { type: Number, required: true, unique: true },
    img: [{ type: String }],
    classSeries: { type: String },
    title: { type: String },
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
    mainDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ArtItem', artItemSchema);
