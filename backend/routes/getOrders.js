const express = require("express");
const getOrderRoute = express.Router();
const OrdersModel = require("../model/orders");
const CartsModel = require("../model/carts");

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
    user: order
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

module.exports = getOrderRoute;
