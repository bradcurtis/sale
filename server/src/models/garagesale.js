const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleHouseSchema = new Schema({
  house: String, // String is shorthand for {type: String}
  family: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  meta: {
    votes: Number,
    favs: Number,
  },
});

const SaleHouseEntry = mongoose.model('SaleHouseEntry', saleHouseSchema);

module.exports = SaleHouseEntry;
