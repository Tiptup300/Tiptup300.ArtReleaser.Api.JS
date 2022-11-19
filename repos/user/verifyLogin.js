import { user as userDb } from "../../db/index.js";

export default async function verifyLogin(username, password) {
  let matchUser = (await userDb.readAllUsers())
    .filter((u) => u.username.toLowerCase() === username.toLowerCase())
    .filter((u) => {
      let compareHash = hashPassword(password, u.password_salt);
      return compareHash === u.password_hash;
    });

  if (matchUser.length < 1) {
    return { isValid: false };
  }
  let user = matchUser[0];
  return {
    isValid: true,
    user: { id: user.id, username: user.username, email: user.email },
  };
}
