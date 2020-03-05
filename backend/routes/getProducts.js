const express = require("express");
const getProductsRoute = express.Router();
const ProductModel = require("../model/products");

// multer參考
// https://enginigga.wordpress.com/2019/03/08/node-js-%E7%94%A8express%E5%92%8Cmulter%E4%B8%80%E6%AC%A1%E4%B8%8A%E5%82%B3%E5%A4%9A%E5%BC%B5%E5%9C%96%E7%89%87/
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/static/", // 設定儲存路徑
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single("file-to-upload");

getProductsRoute.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err
      });
    }
    const photoName = `../../.${req.file.destination}${req.file.filename}`;
    return res.status(200).json({
      message: "上傳成功",
      success: true,
      photoName
    });
  });
});

// 獲取產品列表
getProductsRoute.route("/").get((req, res) => {
  ProductModel.find((err, data) => {
    if (err) res.send(err);
    return res.send(data);
  });
});

// 獲取單一商品頁面
getProductsRoute.route("/:_id").get((req, res) => {
  ProductModel.findOne({ _id: req.params._id }, (err, data) => {
    if (err) res.send(err);
    return res.status(200).json({
      data: data,
      success: true
    });
  });
});

// 新增產品
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
        message: "新增失敗",
        error: err,
        success: false
      });
    }
    return res.status(200).json({
      message: "已建立商品",
      success: true
    });
  });
});

// 修改產品
getProductsRoute.route("/:_id").post((req, res) => {
  let {
    _id,
    title,
    category,
    origin_price,
    price,
    unit,
    num,
    description,
    content,
    is_enabled,
    imageUrl,
    createDate
  } = req.body;
  ProductModel.updateOne(
    { _id },
    {
      title,
      category,
      origin_price,
      price,
      unit,
      num,
      description,
      content,
      is_enabled,
      imageUrl,
      createDate
    },
    err => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        message: "修改成功",
        success: true
      });
    }
  );
});

// 刪除產品
getProductsRoute.route("/:_id").delete((req, res) => {
  ProductModel.deleteOne({ _id: req.params._id }, err => {
    if (err) {
      return res.status(400).json({
        message: "刪除失敗",
        error: err,
        success: false
      });
    }
    return res.status(200).json({
      message: "刪除成功",
      success: true
    });
  });
});

module.exports = getProductsRoute;
