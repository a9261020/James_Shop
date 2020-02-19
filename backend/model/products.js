const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  category: String,
  origin_price: Number,
  price: Number,
  unit: String,
  num: Number,
  description: String,
  content: String,
  is_enabled: Number,
  imageUrl: String,
  createDate: Date
});

module.exports = mongoose.model("Product", ProductSchema);
