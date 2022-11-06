const express = require("express");
const userService = require("./userService");

var router = express.Router();

router.post("/", userService.postUser);
module.exports = router;
