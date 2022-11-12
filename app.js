var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var setAppCleanupOnClose = require("./tools/appCleanup");
var dbConnection = require("./tools/db").dbConnection;
var authenticate = require("./tools/authenticate");

var userRouter = require("./user/userRouter");
var authRouter = require("./auth/authRouter");

var app = express();

dbConnection.start();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(authenticate);
app.use("/user", userRouter);
app.use("/auth", authRouter);

setAppCleanupOnClose();

module.exports = app;
