import auth from "../../auth/index.js";
import userRepo from "../../repos/user/index.js";

export default async function postLogin(request, response, next) {
  if (!request.body || !request.body.username || !request.body.password) {
    return response.status(401).send({
      error: "A username & password must be specified.",
    });
  }
  const { username, password } = request.body;

  const { isValid, user } = await userRepo.verifyLogin(username, password);
  if (!isValid) {
    return response.sendStatus(401);
  }
  const token = `${auth.signAuthenticationToken({
    user,
    roles: ["user"],
  })}`;
  return response.status(200).send({ token });
}
