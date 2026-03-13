const { isNonEmptyString } = require("./common");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignupDto(body) {
  const errors = [];
  const username = body?.username;
  const email = body?.email;
  const password = body?.password;

  if (!isNonEmptyString(username)) errors.push("username is required");
  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim())) errors.push("valid email is required");
  if (!isNonEmptyString(password)) errors.push("password is required");

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      username: typeof username === "string" ? username.trim() : username,
      email: typeof email === "string" ? email.trim().toLowerCase() : email,
      password,
    },
  };
}

function validateLoginDto(body) {
  const errors = [];
  const email = body?.email;
  const password = body?.password;

  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim())) errors.push("valid email is required");
  if (!isNonEmptyString(password)) errors.push("password is required");

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      email: typeof email === "string" ? email.trim().toLowerCase() : email,
      password,
    },
  };
}

module.exports = {
  validateSignupDto,
  validateLoginDto,
};
