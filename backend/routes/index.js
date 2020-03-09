const express = require("express");
const router = express.Router();

const signupRoute = require("./signup");
const loginRoute = require("./login");
const getProductsRoute = require("./getProducts");
const getCartsRoute = require("./getCarts");
const getCouponsRoute = require("./getCoupons");
const getOrdersRoute = require("./getOrders");
const messagesRoute = require("./messages");
const usersRoute = require("./users");
const uploadRoute = require("./upload");

router.use("/api/signup", signupRoute);
router.use("/api/login", loginRoute);
router.use("/api/getProducts", getProductsRoute);
router.use("/api/getCarts", getCartsRoute);
router.use("/api/getCoupons", getCouponsRoute);
router.use("/api/getOrders", getOrdersRoute);
router.use("/api/messages", messagesRoute);
router.use("/api/users", usersRoute);
router.use("/api/upload", uploadRoute);

module.exports = router;
