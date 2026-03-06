const jwt = require("jsonwebtoken");
const env = require("../config/env");

function fetchUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, env.jwtSecret);
    req.user = data.user;
    return next();
  } catch (error) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
}

module.exports = { fetchUser };
