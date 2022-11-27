import mysql from "mysql";
import connectionState from "./connectionState.js";

export default function start() {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  connection.connect();
  connectionState.set(connection);
  console.log("Connection to mysql started.");
}
