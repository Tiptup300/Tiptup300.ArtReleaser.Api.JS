var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var setAppCleanupOnClose = require("./appCleanup");
var dbConnection = require("./db").dbConnection;

var userRouter = require("./user/userRouter");
var tokenRouter = require("./token/tokenRouter");

var app = express();

dbConnection.start();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/token", tokenRouter);

setAppCleanupOnClose();

module.exports = app;
