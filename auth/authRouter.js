const express = require("express");
const authorize = require("../tools/authorize");
const { getToken, postToken, postLogin } = require("./authService");

const router = express.Router();
router.get("/token", authorize("guest", "user"), getToken);
router.post("/token", postToken);
router.post("/login", postLogin);

module.exports = router;
