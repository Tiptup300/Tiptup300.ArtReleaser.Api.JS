const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// authentication
const generateSalt = function () {
  return crypto
    .randomBytes(parseInt(process.env.PASSWORD_SALT_LENGTH))
    .toString("hex");
};

// authentication
const hashPassword = function (password, salt) {
  return crypto
    .pbkdf2Sync(
      password,
      salt,
      parseInt(process.env.PASSWORD_HASH_ITERATIONS),
      parseInt(process.env.PASSWORD_HASH_LENGTH),
      "sha512"
    )
    .toString("hex");
};

// authentication
const signToken = function (body) {
  return jwt.sign(body, getEncodedTokenSecret(), {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

// authenticatino
const verifyToken = function (token) {
  return jwt.verify(token, getEncodedTokenSecret());
};

// authentication
function getEncodedTokenSecret() {
  return Buffer.from(process.env.TOKEN_SECRET).toString("base64");
}

module.exports = {
  generateSalt,
  hashPassword,
  signToken,
  verifyToken,
};
