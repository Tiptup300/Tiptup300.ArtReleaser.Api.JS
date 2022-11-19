import auth from "../../auth/index.js";
import { user as userDb } from "../../db/index.js";

export default async function createUser({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot create user, all parameters must be completed.");
  }

  if (await isUsernameTaken(username)) {
    throw new Error("Cannot create user, username is already taken.");
  }

  let { salt, passwordHash } = auth.generatePasswordHash(password);

  let userId = await userDb.createUser({
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
    let users = await userDb.readAllUsers();
    return users.some(
      (u) => u.username.toLowerCase() == username.toLowerCase()
    );
  }
}
