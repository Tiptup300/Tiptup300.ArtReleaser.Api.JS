const express = require("express");
const userService = require("./userService");
const authorize = require("../tools/authorize");

var router = express.Router();

router.post("/", authorize("guest"), userService.postUser);
module.exports = router;
