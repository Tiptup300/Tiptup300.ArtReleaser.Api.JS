const mysql = require("mysql");

let connection;

const start = function () {
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  connection.connect();
  console.log("Connection to mysql started.");
};

const query = (qry, params) => {
  return new Promise((resolve, reject) => {
    connection.query(qry, params ? params : [], (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

const close = function () {
  if (!connection) {
    return;
  }
  connection.end();
  connection = null;
  console.log("Connection to mysql ended.");
};

module.exports = {
  start,
  query,
  close,
};
