const express = require("express");
const router = express.Router();

const signupRoute = require("./signup");
const loginRoute = require("./login");
const getProductsRoute = require("./getProducts");

router.use("/api/signup", signupRoute);
router.use("/api/login", loginRoute);
router.use("/api/getProducts", getProductsRoute);

module.exports = router;
