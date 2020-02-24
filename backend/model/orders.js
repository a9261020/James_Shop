const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  is_paid: Boolean,
  message: String,
  payment_method: String,
  products: String,
  user: {
    userId: String,
    address: String,
    email: String,
    name: String,
    tel: String
  },
  createDate: Date
});

module.exports = mongoose.model("order", OrderSchema);
