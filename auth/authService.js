import { signAuthenticationToken } from "../tools/authHelpers.js";
import { verifyLogin } from "../user/userRepo.js";

export async function getToken(request, response, next) {
  if (process.env.NODE_ENV == "production") {
    return response.status(401).send();
  }
  return response.status(200).send(request.authorization);
}

export async function postToken(request, response, next) {
  const token = signAuthenticationToken({
    roles: ["guest"],
  });
  return response.status(200).send({ token });
}

export async function postLogin(request, response, next) {
  if (!request.body || !request.body.username || !request.body.password) {
    return response.status(401).send({
      error: "A username & password must be specified.",
    });
  }
  const { username, password } = request.body;

  const { isValid, user } = await verifyLogin(username, password);
  if (!isValid) {
    return response.sendStatus(401);
  }
  const token = `${signAuthenticationToken({
    user,
    roles: ["user"],
  })}`;
  return response.status(200).send({ token });
}
