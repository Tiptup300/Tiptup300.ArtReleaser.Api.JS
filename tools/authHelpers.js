import crypto from "crypto";
import jwt from "jsonwebtoken";

export function generatePasswordHash(password) {
  let salt = generatePasswordSalt();
  let passwordHash = hashPassword(password, salt);
  return { salt, passwordHash };

  function generatePasswordSalt() {
    return crypto
      .randomBytes(parseInt(process.env.PASSWORD_SALT_LENGTH))
      .toString("hex");
  }

  function hashPassword(password, salt) {
    return crypto
      .pbkdf2Sync(
        password,
        salt,
        parseInt(process.env.PASSWORD_HASH_ITERATIONS),
        parseInt(process.env.PASSWORD_HASH_LENGTH),
        "sha512"
      )
      .toString("hex");
  }
}

export function signAuthenticationToken(body) {
  return jwt.sign(body, getEncodedTokenSecret(), {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
}

export function verifyAuthenticationToken(token) {
  return jwt.verify(token, getEncodedTokenSecret());
}

function getEncodedTokenSecret() {
  return Buffer.from(process.env.TOKEN_SECRET).toString("base64");
}
