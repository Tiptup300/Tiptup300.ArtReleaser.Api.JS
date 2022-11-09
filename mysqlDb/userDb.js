const dbConnection = require("./dbConnection");

const create = async function ({
  username,
  passwordHash,
  passwordSalt,
  email,
}) {
  let result = await dbConnection.query(
    `
      INSERT INTO users (username, email, password_hash, password_salt) 
      VALUES ( ?, ?, ?, ? );
    `,
    [username, email, passwordHash, passwordSalt]
  );

  return result.insertId;
};

const read = async function ({ userId }) {
  let result = await dbConnection.query(
    `
      SELECT id, username, email, password_hash, password_salt 
      FROM users
      WHERE id = ?;
    `,
    [userId]
  );

  return result[0];
};

const readAll = async function () {
  let result = await dbConnection.query(
    `
        SELECT id, username, email, password_hash, password_salt
        FROM users
      `
  );

  return result;
};

module.exports = {
  create,
  read,
  readAll,
};
