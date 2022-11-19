import jwt from "jsonwebtoken";
import getEncodedTokenSecret from "./getEncodedTokenSecret.js";

export default function verifyAuthenticationToken(token) {
  return jwt.verify(token, getEncodedTokenSecret());
}
