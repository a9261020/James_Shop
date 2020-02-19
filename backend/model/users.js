const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  gender: String,
  name: String,
  password: String,
  createDate: Date,
  isAdmin: Boolean
});

module.exports = mongoose.model("User", UserSchema);
