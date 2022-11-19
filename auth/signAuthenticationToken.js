import jwt from "jsonwebtoken";
import getEncodedTokenSecret from "./getEncodedTokenSecret.js";

export default function signAuthenticationToken(body) {
  return jwt.sign(body, getEncodedTokenSecret(), {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
}
