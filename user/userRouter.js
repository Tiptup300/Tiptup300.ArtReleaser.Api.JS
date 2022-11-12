const express = require("express");
const authorize = require("../tools/authorize");
const { postUser } = require("./userService");

var router = express.Router();
router.post("/", authorize("guest"), postUser);

module.exports = router;
