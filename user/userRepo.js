const userDb = require("../tools/db").userDb;
const authHelpers = require("../tools/authHelpers");

const createUser = async function ({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Cannot create user, all parameters must be completed.");
  }

  if (await isUsernameTaken(username)) {
    throw new Error("Cannot create user, username is already taken.");
  }

  let passwordSalt = authHelpers.generateSalt();
  let passwordHash = authHelpers.hashPassword(password, passwordSalt);

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
    return users.some(
      (u) => u.username.toLowerCase() == username.toLowerCase()
    );
  }
};

const verifyLogin = async function (username, password) {
  let matchUser = (await userDb.readAll())
    .filter((u) => u.username.toLowerCase() === username.toLowerCase())
    .filter((u) => {
      let compareHash = authHelpers.hashPassword(password, u.password_salt);
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
};

module.exports = { createUser, verifyLogin };
