export default async function readUser({ userId }) {
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
