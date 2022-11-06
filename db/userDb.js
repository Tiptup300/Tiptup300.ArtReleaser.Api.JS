const dbConnection = require("./dbConnection");

const create = function ({ username, passwordHash, passwordSalt, email }) {
  return new Promise((resolve, reject) => {
    let connection = dbConnection.create();
    connection.query(
      `
        INSERT INTO users (username, email, password_hash, password_salt) 
        VALUES ( ?, ?, ?, ? );
      `,
      [username, email, passwordHash, passwordSalt],
      (error, rows, fields) => {
        if (error) reject(error);
        resolve(rows.insertId);
      }
    );
    connection.end();
  });
};

const read = function ({ userId }) {
  return new Promise((resolve, reject) => {
    let connection = dbConnection.create();
    connection.query(
      `
        SELECT id, username, email, password_hash, password_salt 
        FROM users
        WHERE id = ?;
      `,
      [userId],
      (error, rows, fields) => {
        if (!error) {
          resolve(rows[0]);
        } else {
          reject(error);
        }
      }
    );
    connection.end();
  });
};

const readAll = function () {
  return new Promise((resolve, reject) => {
    let connection = dbConnection.create();
    connection.query(
      `
        SELECT id, username, email
        FROM users
      `,
      (error, rows, fields) => {
        if (error) {
          resolve(rows);
        } else {
          reject(error);
        }
      }
    );
    connection.end();
  });
};

module.exports = {
  create,
  read,
  readAll,
};
