const db = require("./db");

const create = function ({ username, passwordHash, passwordSalt, email }) {
  db.useConnection((conn) => {
    conn.query(
      `
        INSERT INTO users (username, email, password_hash, password_salt) 
        VALUES ( '${username}', '${email}', '${passwordHash}', '${passwordSalt}' );`,
      (error, rows, fields) => {
        if (error) throw error;

        console.log(`INSERT ID: ${rows.insertId}`);
        return rows.insertId;
      }
    );
  });
};

const read = function ({ userId }) {
  db.useConnection((conn) => {
    conn.query(
      `
      SELECT id, username, email, password_hash, password_salt 
      FROM users
      WHERE id = ${userId};`,
      (error, rows, fields) => {
        if (error) throw error;

        return rows[0];
      }
    );
  });
};

module.exports = {
  create,
  read,
};
