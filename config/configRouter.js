const express = require("express");
const authorize = require("../tools/authorize");
const { initConfig } = require("./configService");

const router = express.Router();
router.post("/init", authorize("admin"), initConfig);

module.exports = router;
