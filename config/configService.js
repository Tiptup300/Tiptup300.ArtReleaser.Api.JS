const initConfig = function (request, response, next) {
  response.status("200").send("hello");
};

module.exports = { initConfig };
