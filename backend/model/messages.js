const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userName: String,
  context: String,
  reply: String,
  is_reply: Boolean,
  replyDate: Date,
  createDate: Date
});

module.exports = mongoose.model("message", messageSchema);
