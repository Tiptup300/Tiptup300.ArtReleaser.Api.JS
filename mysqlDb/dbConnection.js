const mysql = require("mysql");

const create = function () {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  connection.connect();
  return connection;
};

const query = (qry, params) => {
  return new Promise((resolve, reject) => {
    let conn = create();
    conn.query(qry, params ? params : [], (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
    conn.end();
  });
};

module.exports = {
  query,
};
