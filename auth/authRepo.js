const userDb = require("../db").userDb;
const auth = require("../auth");

const isValidLogin = async function (username, password) {
  let users = await userDb.readAll();
  console.log("username:", username);
  let matchUser = users
    .filter((u) => u.username.toLowerCase() === username.toLowerCase())
    .filter((u) => {
      let compareHash = auth.hashPassword(password, u.password_salt);
      console.log(u, compareHash);
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

module.exports = {
  isValidLogin,
};
