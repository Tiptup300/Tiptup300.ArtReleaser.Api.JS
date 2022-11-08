const dbType = "mysqlDb";

const userDb = require(`./${dbType}/userDb`);
const dbConnection = require(`./${dbType}/dbConnection`);

module.exports = {
  userDb,
  dbConnection,
};
