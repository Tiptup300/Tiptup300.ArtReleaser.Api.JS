import { generatePasswordHash } from "../tools/authHelpers.js";
import {
  createUser as dbCreateUser,
  readAllUsers,
  readUser,
} from "../tools/db.js";

export async function createUser({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot create user, all parameters must be completed.");
  }

  if (await isUsernameTaken(username)) {
    throw new Error("Cannot create user, username is already taken.");
  }

  let { salt, passwordHash } = generatePasswordHash(password);

  let userId = await dbCreateUser({
    username,
    passwordHash,
    passwordSalt: salt,
    email,
  });
  let user = await readUser({ userId });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  async function isUsernameTaken(username) {
    let users = await readAllUsers();
    return users.some(
      (u) => u.username.toLowerCase() == username.toLowerCase()
    );
  }
}

export async function verifyLogin(username, password) {
  let matchUser = (await readAllUsers())
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
