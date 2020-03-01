const express = require("express");
const getOrderRoute = express.Router();
const OrdersModel = require("../model/orders");
const CartsModel = require("../model/carts");
const ProductsModel = require("../model/products");

getOrderRoute.route("/").get((req, res) => {
  OrdersModel.find({}, (err, orders) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err: err
      });
    }
    return res.status(200).json({
      message: "訂單列表",
      success: true,
      orders
    });
  });
});

getOrderRoute.route("/createOrder").post((req, res) => {
  const qty = req.body.cart.carts;
  const order = req.body.order.user;
  const cart = JSON.stringify(req.body.cart);
  const message = req.body.order.message;

  const newOrder = new OrdersModel({
    orderNo: Math.floor(Math.random() * 1000000000),
    is_paid: false,
    message,
    payment_method: "Credit Card",
    products: cart,
    price: req.body.cart.final_total,
    user: order,
    createDate: new Date()
  });

  newOrder.save((err, order) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err
      });
    }

    res.status(200).json({
      message: "訂單建立成功",
      success: true,
      order
    });
  });

  // 訂單成立調整庫存
  qty.forEach(item => {
    const _id = item.product._id;
    const qty = item.qty;
    ProductsModel.findOne({ _id }, (err, product) => {
      if (err) {
        return res.status(500).json({
          message: "伺服器錯誤",
          err,
          success: false
        });
      }
      const nowNum = product.num - qty;
      ProductsModel.updateOne({ _id }, { num: nowNum }, err => {
        if (err) {
          return res.status(500).json({
            message: "伺服器錯誤",
            err,
            success: false
          });
        }
      });
    });
  });

  // 訂單成立調整購物車
  CartsModel.deleteOne({ userId: order.userId }, err => {
    if (err) {
      return res.status(500).json({
        message: "刪除購物車伺服器錯誤",
        err,
        success: false
      });
    }
  });
});

getOrderRoute.route("/pay").post((req, res) => {
  const order = req.body;
  OrdersModel.updateOne({ _id: order._id }, { is_paid: true }, err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err
      });
    }
    return res.status(200).json({
      message: "付款成功",
      success: true,
      is_paid: true
    });
  });
});

module.exports = getOrderRoute;
