import { query } from "./dbConnection.js";

export async function createUser({
  username,
  passwordHash,
  passwordSalt,
  email,
}) {
  let result = await query(
    `
      INSERT INTO users (username, email, password_hash, password_salt) 
      VALUES ( ?, ?, ?, ? );
    `,
    [username, email, passwordHash, passwordSalt]
  );

  return result.insertId;
}

export async function readUser({ userId }) {
  let result = await query(
    `
      SELECT id, username, email, password_hash, password_salt 
      FROM users
      WHERE id = ?;
    `,
    [userId]
  );

  return result[0];
}

export async function readAllUsers() {
  let result = await query(
    `
        SELECT id, username, email, password_hash, password_salt
        FROM users
      `
  );

  return result;
}
