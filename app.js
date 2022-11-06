var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routers/indexRouter");
var configRouter = require("./routers/configRouter");
var userRouter = require("./routers/userRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/config", configRouter);
app.use("/user", userRouter);

module.exports = app;
