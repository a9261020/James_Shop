const express = require("express");
const getProductsRoute = express.Router();
const ProductModel = require("../model/products");

// 確認是否有作用
getProductsRoute.route("/").get((req, res) => {
  ProductModel.find((err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

getProductsRoute.route("/").post((req, res) => {
  const newProduct = new ProductModel({
    title: req.body.title,
    category: req.body.category,
    origin_price: req.body.origin_price,
    price: req.body.price,
    unit: req.body.unit,
    num: req.body.num,
    description: req.body.description,
    content: req.body.content,
    is_enabled: req.body.is_enabled,
    imageUrl: req.body.imageUrl,
    createDate: new Date()
  });
  newProduct.save(err => {
    if (err) {
      return res.status(400).json({
        title: "新增錯誤",
        message: "不知明原因",
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      message: "已建立商品"
    });
  });
});

module.exports = getProductsRoute;
