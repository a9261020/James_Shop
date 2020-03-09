const express = require("express");
const uploadRoute = express.Router();
const path = require("path");

// multer參考
// https://enginigga.wordpress.com/2019/03/08/node-js-%E7%94%A8express%E5%92%8Cmulter%E4%B8%80%E6%AC%A1%E4%B8%8A%E5%82%B3%E5%A4%9A%E5%BC%B5%E5%9C%96%E7%89%87/
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/static/", // 設定儲存路徑
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single("file-to-upload");

uploadRoute.post("/", (req, res) => {
  upload(req, res, err => {
    const filePath = req.file.path;
    const imagePath = path.join(process.cwd(), filePath);
    let url = "http://" + req.headers.host + "/upload/" + req.file.filename;
    res.set("Content-Type", "image/jpg");
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err
      });
    }
    return res.status(200).json({
      message: "上傳成功",
      success: true,
      imagePath
    });
  });
});

module.exports = uploadRoute;
