const userRepo = require("../user/userRepo");
const authHelpers = require("../tools/authHelpers");

const getToken = async function (request, response, next) {
  if (process.env.NODE_ENV == "production") {
    return response.status(401).send();
  }
  return response.status(200).send(request.authorization);
};

const postToken = async function (request, response, next) {
  const token = authHelpers.signToken({
    roles: ["guest"],
  });
  return response.status(200).send({ token });
};

const postLogin = async function (request, response, next) {
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
  const token = `${authHelpers.signToken({
    user,
    roles: ["user"],
  })}`;
  return response.status(200).send({ token });
};

module.exports = {
  postToken,
  postLogin,
  getToken,
};
