const express = require("express");
const router = express.Router();

const signupRoute = require("./signup");
const loginRoute = require("./login");

router.use("/api/signup", signupRoute);
router.use("/api/login", loginRoute);

module.exports = router;
