const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://James:Bemeowcat1112@jamesshop-t3tmk.mongodb.net/JamesShop?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

const port = 5000;

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is running on ${port}`);
});
