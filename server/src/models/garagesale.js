const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleHouseSchema = new Schema({
  house: String, // String is shorthand for {type: String}
  family: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const SaleHouseEntry = mongoose.model('SaleHouseEntry', saleHouseSchema);

module.exports = SaleHouseEntry;
