const express = require("express");
const getCouponRoute = express.Router();
const CouponsModel = require("../model/coupons");

// 取得優惠券列表
getCouponRoute.route("/").get((req, res) => {
  CouponsModel.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "查詢優惠券錯誤",
        err: err
      });
    }

    return res.status(200).json({
      message: "優惠券列表",
      data: data,
      success: true
    });
  });
});

// 新增優惠券
getCouponRoute.route("/addNewCoupon").post((req, res) => {
  const from = req.body.data;
  const newConpon = new CouponsModel({
    title: from.title,
    code: from.code,
    due_date: new Date(from.due_date),
    percent: from.percent,
    is_enabled: from.is_enabled,
    createDate: new Date()
  });
  newConpon.save(err => {
    if (err) {
      return res.status(400).json({
        message: "新增優惠券失敗",
        err: err,
        success: false
      });
    }
    return res.status(200).json({
      message: "新增優惠券成功",
      success: true
    });
  });
});

// 修改優惠券
getCouponRoute.route("/").post((req, res) => {
  const { _id, title, code, due_date, percent, is_enabled } = req.body;
  CouponsModel.updateOne(
    { _id },
    { title, code, due_date, percent, is_enabled },
    err => {
      if (err) {
        return res.status(400).json({
          message: "更新失敗",
          err: err,
          success: false
        });
      }
      return res.status(200).json({
        message: "更新優惠券",
        success: true
      });
    }
  );
});

// 刪除
getCouponRoute.route("/deleteCoupon/:_id").delete((req, res) => {
  const _id = req.params._id;
  CouponsModel.deleteOne({ _id }, err => {
    if (err) {
      return res.status(400).json({
        message: "刪除錯誤",
        err: err,
        success: false
      });
    }
    return res.status(200).json({
      message: "已刪除優惠券",
      success: true
    });
  });
});

// 套用
getCouponRoute.route("/useCoupon").post((req, res) => {
  const couponCode = req.body.couponCode;
  CouponsModel.findOne({ code: couponCode }, (err, coupon) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err: err
      });
    }
    if (!coupon) {
      return res.status(401).json({
        message: "查無此優惠券",
        success: false
      });
    }

    // 判斷取得優惠券的日期是否過期
    const today = new Date();
    if (coupon.due_date > today) {
      return res.status(200).json({
        message: `成功使用優惠券${coupon.code}`,
        success: true
      });
    } else {
      return res.status(401).json({
        message: "此優惠券已過期",
        success: false
      });
    }
  });
});

module.exports = getCouponRoute;
