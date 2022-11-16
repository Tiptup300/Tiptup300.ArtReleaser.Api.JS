import { createUser } from "./userRepo.js";

export async function postUser(request, response) {
  if (
    !request.body ||
    !request.body.username ||
    !request.body.password ||
    !request.body.email
  ) {
    return response.status(400).send({
      error: "A username, password, & email must be specified.",
    });
  }

  let username = request.body.username.trim();
  if (/^[^\W_]{3,30}$/g.test(username) == false) {
    return response.status(400).send({
      error:
        "Username must have a minimum of three characters, a maximum of 30 characters long, and cannot contain symbols.",
      field: "username",
    });
  }

  let password = request.body.password;
  if (
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(
      password
    ) === false
  ) {
    return response.status(400).send({
      error:
        "Password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      field: "password",
    });
  }

  let email = request.body.email;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
    return response.status(400).send({
      error: "Email address must be valid.",
      field: email,
    });
  }

  try {
    let user = await createUser({
      username,
      password,
      email,
    });
    return response.status(200).send(user);
  } catch (ex) {
    return response.status(400).send({
      error: `An error occured creating the user: ${ex.message}`,
    });
  }
}
