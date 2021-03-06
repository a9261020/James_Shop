const express = require("express");
const signupRoute = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../model/users");

signupRoute.route("/").post((req, res) => {
  const newUser = new UserModel({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    gender: req.body.gender,
    createDate: new Date(),
    isAdmin: false
  });
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: "伺服器錯誤",
        err
      });
    }
    return res.status(200).json({
      title: "註冊成功"
    });
  });
});

signupRoute.route("/").get((req, res) => {
  UserModel.find((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});

module.exports = signupRoute;
