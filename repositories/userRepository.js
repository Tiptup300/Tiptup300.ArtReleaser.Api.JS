const userDb = require("../db/userDb");

const createUser = function ({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot createUser, all parameters must be completed.");
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

  let userId = userDb.create({
    username,
    passwordHash,
    passwordSalt,
    email,
  });
  let user = userDb.read({ userId });

  return {
    userid: user.id,
    username: user.username,
    email: user,
  };
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
