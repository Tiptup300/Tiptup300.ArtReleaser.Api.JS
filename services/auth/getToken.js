export default async function getToken(request, response, next) {
  if (process.env.NODE_ENV == "production") {
    return response.status(401).send();
  }
  return response.status(200).send(request.authorization);
}
