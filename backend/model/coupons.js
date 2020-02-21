const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  title: String,
  code: String,
  due_date: Date,
  percent: Number,
  is_enabled: Number,
  createDate: Date
});

module.exports = mongoose.model("coupon", CouponSchema);
