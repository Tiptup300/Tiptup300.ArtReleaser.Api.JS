const express = require("express");
const router = express.Router();
const tokenService = require("./tokenService");

router.post("/", tokenService.postToken);
module.exports = router;
