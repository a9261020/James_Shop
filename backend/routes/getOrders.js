const express = require("express");
const getOrderRoute = express.Router();
const OrdersModel = require("../model/orders");

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
      orders
    });
  });
});

getOrderRoute.route("/createOrder").post((req, res) => {
  const order = req.body.order.user;
  const cart = req.body.cart;
  const message = req.body.order.message;
  const newOrder = new OrdersModel({
    is_paid: false,
    message,
    payment_method: "Credit Card",
    products: cart,
    user: order
  });

  newOrder.save(err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err
      });
    }
    return res.status(200).json({
      message: "訂單建立成功",
      success: true
    });
  });
});

module.exports = getOrderRoute;
