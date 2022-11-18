import query from "../connection/query.js";

export default async function readAllUsers() {
  let result = await query(
    `
        SELECT id, username, email, password_hash, password_salt
        FROM users
    `
  );

  return result;
}
