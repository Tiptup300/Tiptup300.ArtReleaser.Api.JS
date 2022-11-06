const postToken = async function (request, response, next) {
  response.send("hello");
};

module.exports = {
  postToken,
};
