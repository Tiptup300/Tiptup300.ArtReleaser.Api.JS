const express = require("express");
const userService = require("../services/userService");

var router = express.Router();

router.post("/", async (req, res) => userService.postUser(req, res));

module.exports = router;
