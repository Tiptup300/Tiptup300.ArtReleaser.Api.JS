import auth from "../auth/index.js";

export default async function authenticate(request, response, next) {
  let token = request.headers["authorization"];
  if (!token || !token.startsWith("Bearer ") || token == "Bearer null") {
    return next();
  }
  token = token.substring(7);
  try {
    request.authorization = auth.verifyAuthenticationToken(token);
  } catch {}

  return next();
}
