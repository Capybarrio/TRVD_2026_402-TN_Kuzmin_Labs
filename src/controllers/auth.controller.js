const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { findUserByEmail, createUser } = require("../services/user.service");
const { hashPassword, verifyPassword } = require("../utils/password");

function signToken(user) {
  return jwt.sign(
    {
      user: {
        id: user.id,
        role: user.role,
      },
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
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

  const hashedPassword = await hashPassword(password);
  const user = await createUser({ username, email, password: hashedPassword });
  const token = signToken(user);
  return res.json({ success: true, token });
}

async function loginController(req, res) {
  const { email, password } = req.validatedBody;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.json({ success: false, errors: "Wrong Email Id" });
  }

  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    return res.json({ success: false, errors: "Wrong Password" });
  }

  const token = signToken(user);
  return res.json({ success: true, token });
}

module.exports = {
  signupController,
  loginController,
};
