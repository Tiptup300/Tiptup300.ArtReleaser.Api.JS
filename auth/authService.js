const authRepo = require("./authRepo");
const auth = require("../auth");
const jwt = require("jsonwebtoken");

const postToken = async function (request, response, next) {
  const token = `Bearer ${auth.signToken({
    roles: ["guest"],
    permissions: [""],
  })}`;
  return response.status(200).send({ token });
};

const postLogin = async function (request, response, next) {
  if (!request.body || !request.body.username || !request.body.password) {
    return response.status(401).send({
      error: "A username & password must be specified.",
    });
  }
  const { username, password } = request.body;

  const { isValid, user } = await authRepo.isValidLogin(username, password);
  if (!isValid) {
    return response.sendStatus(401);
  }
  const token = `Bearer ${auth.signToken({
    user,
    roles: ["user"],
    permissions: [""],
  })}`;
  return response.status(200).send({ token });
};

module.exports = {
  postToken,
  postLogin,
};
