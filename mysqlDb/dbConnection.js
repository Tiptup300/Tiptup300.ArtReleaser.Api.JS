import mysql from "mysql";

let connection;

export function StartDatabaseConnection() {
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  connection.connect();
  console.log("Connection to mysql started.");
}

export function query(qry, params) {
  return new Promise((resolve, reject) => {
    connection.query(qry, params ? params : [], (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export function EndDatabaseConnection() {
  if (!connection) {
    return;
  }
  connection.end();
  connection = null;
  console.log("Connection to mysql ended.");
}
