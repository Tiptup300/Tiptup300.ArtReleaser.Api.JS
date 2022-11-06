var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var userRouter = require("./user/userRouter");
var tokenRouter = require("./token/tokenRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/token", tokenRouter);

module.exports = app;
