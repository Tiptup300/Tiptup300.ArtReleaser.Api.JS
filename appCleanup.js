const dbConnection = require("./db").dbConnection;

const setAppCleanupOnClose = function () {
  process.stdin.resume(); //so the program will not close instantly

  function exitHandler(options, exitCode) {
    dbConnection.close();
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

  //catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
};

module.exports = setAppCleanupOnClose;
