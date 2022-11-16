export default function Authorize(...permittedRoles) {
  return (request, response, next) => {
    const { authorization } = request;

    if (
      authorization &&
      permittedRoles.some((pRole) =>
        authorization.roles.some((r) => r === pRole)
      )
    ) {
      next();
    } else {
      response.status(403).json({ message: "Forbidden" });
    }
  };
}
