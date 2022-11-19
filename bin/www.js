#!/usr/bin/env node
import debug from "debug";
import dotenv from "dotenv";
import http from "http";
import app from "../app.js";
import { connection } from "../db/index.js";

setDevOrProduction();
connection.start();
setAppCleanupOnClose();
createServer();

function setDevOrProduction() {
  if (process.env.NODE_ENV !== "production") {
    console.log("DEV MODE");
    dotenv.config();
  } else {
    console.log("PROD MODE");
  }
}

function createServer() {
  let port = setPort();
  var server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  }
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }

  function setPort() {
    var port = normalizePort(process.env.PORT || "3000");
    app.set("port", port);
    return port;

    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        return val; // named pipe
      } else if (port >= 0) {
        return port; // port number
      } else {
        return false;
      }
    }
  }
}
function setAppCleanupOnClose() {
  process.stdin.resume(); //so the program will not close instantly

  function exitHandler(options, exitCode) {
    connection.end();
    if (exitCode || exitCode === 0) console.log(`Exit Code: '${exitCode}'`);
    if (options.exit) process.exit();
  }

  //do something when app is closing
  process.on("exit", exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
}
