const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

const url =
  process.env.MONGOHQ_URL ||
  "mongodb+srv://James:Bemeowcat1112@jamesshop-t3tmk.mongodb.net/JamesShop?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/../dist/"));

  // handle SPA
  app.use(/.*/, (req, res) => res.sendFile(__dirname + "/../dist/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is running on ${port}`);
});
