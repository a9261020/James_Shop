const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  carts: {
    type: Array,
    id: Array,
    product: {
      type: Object
    },
    qty: Number,
    total: Number,
    final_total: Number
  },
  userId: String,
  total: Number,
  final_total: Number,
  createDate: Date
});

module.exports = mongoose.model("Cart", CartSchema);
