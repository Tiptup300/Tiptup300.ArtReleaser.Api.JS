const userDb = require("../db/userDb");
const crypto = require("crypto");

const createUser = async function ({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot create user, all parameters must be completed.");
  }

  if (await isUsernameTaken(username)) {
    throw new Error("Cannot create user, username is already taken.");
  }

  let passwordSalt = crypto
    .randomBytes(parseInt(process.env.PASSWORD_SALT_LENGTH))
    .toString("hex");

  let passwordHash = crypto
    .pbkdf2Sync(
      password,
      passwordSalt,
      parseInt(process.env.PASSWORD_HASH_ITERATIONS),
      parseInt(process.env.PASSWORD_HASH_LENGTH),
      "sha512"
    )
    .toString("hex");

  let userId = await userDb.create({
    username,
    passwordHash,
    passwordSalt,
    email,
  });
  let user = await userDb.read({ userId });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  async function isUsernameTaken(username) {
    let users = await userDb.readAll();
    return users.some((u) => u.username == username);
  }
};

const readUser = function ({ userId }) {
  if (!userId) {
    throw new Error("Cannot read user, id must be set.");
  }
  if (isNaN(userId)) {
    throw new Error("Cannot read user, id must be a number.");
  }
};

module.exports = { createUser, readUser };
