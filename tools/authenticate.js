const authHelpers = require("./authHelpers");

async function authenticate(request, response, next) {
  let token = request.headers["authorization"];
  if (!token || !token.startsWith("Bearer ") || token == "Bearer null") {
    return next();
  }
  token = token.substring(7);
  try {
    request.authorization = authHelpers.verifyToken(token);
  } catch {}

  return next();
}

module.exports = authenticate;
