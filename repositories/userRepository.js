const mysql = require("mysql");
const connection = "";

const createUser = function (createUserRequest) {
  let { username, password, email } = createUserRequest;
  return {
    id: -1,
    ...createUserRequest,
  };
};

module.exports = { createUser };
