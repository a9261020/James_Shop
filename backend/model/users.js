let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  gender: String,
  name: String,
  password: String,
  createDate: String,
  isAdmin: Boolean
});

module.exports = mongoose.model("User", UserSchema);
