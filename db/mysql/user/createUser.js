import query from "../connection/query.js";

export default async function createUser({
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
