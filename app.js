var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var setAppCleanupOnClose = require("./tools/appCleanup");
var { dbConnection } = require("./tools/db");
var authenticate = require("./tools/authenticate");

var userRouter = require("./user/userRouter");
var authRouter = require("./auth/authRouter");
var configRouter = require("./config/configRouter");

var app = express();

dbConnection.start();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use(authenticate);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/config", configRouter);

setAppCleanupOnClose();

module.exports = app;
