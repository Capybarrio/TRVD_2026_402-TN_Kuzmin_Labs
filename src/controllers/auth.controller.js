const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { findUserByEmail, createUser } = require("../services/user.service");

function signToken(userId) {
  return jwt.sign({ user: { id: userId } }, env.jwtSecret);
}

async function signupController(req, res) {
  const { username, email, password } = req.validatedBody;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }

  const user = await createUser({ username, email, password });
  const token = signToken(user.id);
  return res.json({ success: true, token });
}

async function loginController(req, res) {
  const { email, password } = req.validatedBody;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.json({ success: false, errors: "Wrong Email Id" });
  }

  if (password !== user.password) {
    return res.json({ success: false, errors: "Wrong Password" });
  }

  const token = signToken(user.id);
  return res.json({ success: true, token });
}

module.exports = {
  signupController,
  loginController,
};
