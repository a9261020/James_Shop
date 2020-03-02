const express = require("express");
const loginRoute = express.Router();
const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRoute.route("/").get((req, res) => {
  res.send("login work");
});

loginRoute.route("/").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "連接不到伺服器",
        error: err
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "尚未註冊",
        error: "驗證失敗",
        success: "false"
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: "密碼錯誤",
        error: "驗證失敗",
        success: "false"
      });
    }
    let token = jwt.sign({ userId: user._id }, "secretKey");
    return res.status(200).json({
      message: "登入成功",
      success: "true",
      token: token,
      userId: user._id,
      user
    });
  });
});

loginRoute.route("/loginByFB").post((req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }

    // 先檢查有沒有用fb登入過，如果沒有就重新註冊
    if (!user) {
      const newUser = new User({
        email,
        name,
        createDate: new Date(),
        isAdmin: false
      });

      newUser.save((err, user) => {
        if (err) {
          return res.status(500).json({
            title: "伺服器錯誤",
            err
          });
        }
        return res.status(200).json({
          message: "註冊成功",
          success: true,
          user
        });
      });
    } else {
      let token = jwt.sign({ userId: user._id }, "secretKey");
      return res.status(200).json({
        message: "登入成功",
        success: "true",
        token: token,
        userId: user._id,
        user
      });
    }
  });
});

module.exports = loginRoute;
