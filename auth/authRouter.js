const express = require("express");
const router = express.Router();
const authService = require("./authService");
const authorize = require("../tools/authorize");

router.get("/token", authorize("guest", "user"), authService.getToken);
router.post("/token", authService.postToken);
router.post("/login", authService.postLogin);

module.exports = router;
