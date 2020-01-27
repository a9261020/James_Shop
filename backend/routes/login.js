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
        title: "連接不到伺服器",
        error: err
      });
    }

    if (!user) {
      return res.status(401).json({
        title: "尚未註冊",
        error: "驗證失敗",
        success: "false"
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "登入失敗",
        error: "驗證失敗",
        success: "false"
      });
    }
    let token = jwt.sign({ userId: user._id }, "secretKey");
    return res.status(200).json({
      title: "登入成功",
      success: "true",
      token: token
    });
  });
});

module.exports = loginRoute;
