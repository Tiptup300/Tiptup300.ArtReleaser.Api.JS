import auth from "../../auth/index.js";

export default async function postToken(request, response, next) {
  const token = auth.signAuthenticationToken({
    roles: ["guest"],
  });
  return response.status(200).send({ token });
}
