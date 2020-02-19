const express = require("express");
const getCouponRoute = express.Router();

// 取得優惠券列表
getCouponRoute.route("/").get((req, res) => {
  res.send("getCouponRoute work");
});

// 新增優惠券
getCouponRoute.route("/addNewCoupon").post((req, res) => {
  console.log(req);
});

module.exports = getCouponRoute;
