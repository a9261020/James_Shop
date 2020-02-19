const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  title: String,
  percent: Number,
  code: String,
  is_enable: Boolean,
  due_date: Date,
  createDate: Date
});

module.exports = mongoose.model("coupon", CouponSchema);
