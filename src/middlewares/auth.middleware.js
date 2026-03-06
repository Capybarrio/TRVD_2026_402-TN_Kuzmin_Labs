const jwt = require("jsonwebtoken");
const env = require("../config/env");

function extractToken(req) {
  const authHeader = req.header("authorization") || req.header("Authorization");
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  const legacyToken = req.header("auth-token");
  if (legacyToken) {
    return legacyToken;
  }

  return null;
}

function fetchUser(req, res, next) {
  const token = extractToken(req);
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

function requireRole(...roles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ success: false, errors: "Forbidden" });
    }

    return next();
  };
}

module.exports = { fetchUser, requireRole };
