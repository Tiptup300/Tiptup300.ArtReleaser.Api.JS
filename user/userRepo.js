const userDb = require("../db").userDb;
const auth = require("../auth");

const createUser = async function ({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot create user, all parameters must be completed.");
  }

  if (await isUsernameTaken(username)) {
    throw new Error("Cannot create user, username is already taken.");
  }

  let passwordSalt = auth.generateSalt();
  let passwordHash = auth.hashPassword(password, passwordSalt);

  let userId = await userDb.create({
    username,
    passwordHash,
    passwordSalt,
    email,
  });
  let user = await userDb.read({ userId });

  console.log(`userRepo: Created new user (${user.id} - ${user.username})`);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  async function isUsernameTaken(username) {
    let users = await userDb.readAll();
    return users.some(
      (u) => u.username.toLowerCase() == username.toLowerCase()
    );
  }
};

module.exports = { createUser };
