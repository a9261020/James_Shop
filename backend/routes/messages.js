const express = require("express");
const messagesRoute = express.Router();
const messagesModel = require("../model/messages");

// 取得留言列表
messagesRoute.route("/getMessages").get((req, res) => {
  messagesModel.find({}, (err, messages) => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "取得留言列表",
      success: true,
      messages
    });
  });
});

// 新增留言
messagesRoute.route("/addMessage").post((req, res) => {
  console.log(req);
  const userName = req.body.userName === "" ? "訪客" : req.body.userName;

  const newMessage = new messagesModel({
    userName,
    context: req.body.context,
    reply: "請等候客服人員回覆",
    is_reply: false,
    replyDate: null,
    createDate: new Date()
  });

  newMessage.save(err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "已成功留言",
      success: true
    });
  });
});

// 回覆留言
messagesRoute.route("/replyMessage").post((req, res) => {
  const _id = req.body._id;
  const reply = req.body.reply;
  const is_reply = true;
  const replyDate = new Date();

  messagesModel.updateOne({ _id }, { reply, is_reply, replyDate }, err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "回覆成功",
      success: true
    });
  });
});

// 刪除留言
messagesRoute.route("/deleteMessage/:_id").delete((req, res) => {
  const _id = req.params._id;
  messagesModel.deleteOne({ _id }, err => {
    if (err) {
      return res.status(500).json({
        message: "伺服器錯誤",
        err,
        success: false
      });
    }
    return res.status(200).json({
      message: "成功刪除留言",
      success: true
    });
  });
});

module.exports = messagesRoute;
