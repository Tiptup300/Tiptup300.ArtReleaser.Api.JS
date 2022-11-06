const mysql = require("mysql");

const useConnection = function (callBack) {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect();
  callBack(connection);
  connection.end();
};

module.exports = {
  useConnection,
};
