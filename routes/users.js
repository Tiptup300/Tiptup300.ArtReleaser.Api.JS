var express = require("express");
var crypto = require("crypto");
var router = express.Router();
var userRepository = require("../repositories/userRepository");

router.post;

router.post("/", function (req, res, next) {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.password ||
    !req.body.email
  ) {
    res.status(400).send({
      error: "Error: A username, password, & email must be specified.",
    });
  }

  let username = req.body.username.trim();
  if (/^[^\W_]{3,30}$/g.test(username) == false) {
    res.status(400).send({
      error:
        "Username must have a minimum of three characters, a maximum of 30 characters long, and cannot contain symbols.",
      field: "username",
    });
  }
  if (username.length < 8) {
  }

  let password = req.body.password;
  if (
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(
      password
    ) === false
  ) {
    console.log(password);
    res.status(400).send({
      error:
        "Password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      field: "password",
    });
  }

  let email = req.body.email;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) {
    res.status(400).send({
      error: "Email address must be valid.",
      field: email,
    });
  }

  try {
    let userId = userRepository.createUser({
      username,
      passwordSalt,
      passwordHash,
      email,
    });
    console.log(userId);
    let user = userRepository.readUser({ userId });
    res.status(200).send({
      message: "User created successfully.",
      user: user,
    });
  } catch (ex) {
    res.status(400).send({
      error: `An error occured creating the user: ${ex.message}`,
    });
  }
});

module.exports = router;
