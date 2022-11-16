import { VerifyAuthenticationToken } from "./authHelpers.js";

export default async function Authenticate(request, response, next) {
  let token = request.headers["authorization"];
  if (!token || !token.startsWith("Bearer ") || token == "Bearer null") {
    return next();
  }
  token = token.substring(7);
  try {
    request.authorization = VerifyAuthenticationToken(token);
  } catch {}

  return next();
}
