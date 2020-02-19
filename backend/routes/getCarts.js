const express = require("express");
const getCartsRoute = express.Router();
const CartModel = require("../model/carts");
const ProductModel = require("../model/products");
const mongoose = require("mongoose");

// 獲得購物車列表
getCartsRoute.route("/").get((req, res) => {
  CartModel.find((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "找不到此購物車",
        success: false
      });
    }
    return res.status(200).json({
      message: "尋找購物車成功",
      success: true,
      data: data
    });
  });
});

// 新增購物車
getCartsRoute.route("/").post((req, res) => {
  const product_id = req.body.product_id;
  const userId = req.body.userId;
  //   先從product中找這個產品，然後丟進購物車裡面

  ProductModel.find({ _id: product_id }, (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "無此商品",
        success: false
      });
    }
    const product = data[0];

    CartModel.findOne({ userId }, (userIderr, existCart) => {
      if (!existCart) {
        // 沒有這個user的購物車
        // 進入這邊新增
        const newCart = new CartModel({
          carts: {
            id: mongoose.Types.ObjectId(),
            product: product,
            qty: req.body.qty,
            total: product.price * req.body.qty,
            final_total: product.price * req.body.qty
          },
          userId: req.body.userId,
          total: product.price * req.body.qty,
          final_total: product.price * req.body.qty,
          createDate: new Date()
        });
        newCart.save(err => {
          if (err) {
            return res.status(400).json({
              message: "新增失敗",
              error: err,
              success: false
            });
          }
          return res.status(200).json({
            message: "已新增至購物車",
            success: true,
            cart: newCart
          });
        });
      } else {
        // 這個user已經有購物車了
        // 進來加入新商品
        const newProduct = {
          id: mongoose.Types.ObjectId(),
          product: product,
          qty: req.body.qty,
          total: product.price * req.body.qty,
          final_total: product.price * req.body.qty
        };
        existCart.carts.push(newProduct);
        CartModel.updateOne(
          { userId },
          { carts: existCart.carts },
          updateErr => {
            if (updateErr) {
              return res.status(400).json({
                message: "新增失敗",
                error: updateErr,
                success: false
              });
            }
            return res.status(200).json({
              message: "已新增至購物車",
              success: true,
              cart: existCart
            });
          }
        );
      }
    });
  });
});

// 刪除購物車商品
getCartsRoute.route("/:_id").post((req, res) => {
  const userId = req.body.nowUserId;
  const _id = req.params._id;
  console.log(`This is cartId ${_id}`);
  CartModel.find({ userId }, (err, data) => {
    let cart = data[0].carts;
    const idx = cart
      .map(item => {
        return item.id;
      })
      .indexOf(_id);
    cart.splice(idx, 1);
    CartModel.updateOne({ userId }, { carts: cart }, updateErr => {
      if (updateErr) {
        return res.status(400).json({
          message: "刪除失敗",
          err: updateErr,
          success: false
        });
      }
      return res.status(200).json({
        message: "已刪除",
        success: true
      });
    });
  });
});

module.exports = getCartsRoute;
