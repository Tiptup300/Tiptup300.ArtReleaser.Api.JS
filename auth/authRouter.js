const express = require("express");
const router = express.Router();
const authService = require("./authService");

router.post("/token", authService.postToken);
router.post("/login", authService.postLogin);

module.exports = router;
