const express = require("express");
const usersRoute = express.Router();
const usersModel = require("../model/users");

usersRoute.route("/getUsers").get((req, res) => {
  usersModel.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "取得使用者列表",
      success: true,
      users
    });
  });
});

usersRoute.route("/updateIsAdmin").post((req, res) => {
  const _id = req.body._id;
  usersModel.updateOne({ _id }, { isAdmin: true }, err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "調整為管理者",
      success: true
    });
  });
});

module.exports = usersRoute;
