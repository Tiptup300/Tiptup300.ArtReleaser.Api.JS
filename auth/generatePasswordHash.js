import crypto from "crypto";

export default function generatePasswordHash(password) {
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
