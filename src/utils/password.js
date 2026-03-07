const crypto = require("crypto");

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

function pbkdf2Async(password, salt, iterations, keyLength, digest) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey);
    });
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashBuffer = await pbkdf2Async(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
  const hash = hashBuffer.toString("hex");
  return `pbkdf2$${ITERATIONS}$${KEY_LENGTH}$${DIGEST}$${salt}$${hash}`;
}

async function verifyPassword(password, storedPassword) {
  if (typeof storedPassword !== "string") {
    return false;
  }

  const parts = storedPassword.split("$");
  if (parts.length !== 6 || parts[0] !== "pbkdf2") {
    return false;
  }

  const iterations = Number(parts[1]);
  const keyLength = Number(parts[2]);
  const digest = parts[3];
  const salt = parts[4];
  const storedHashHex = parts[5];

  if (!iterations || !keyLength || !salt || !storedHashHex) {
    return false;
  }

  const hashBuffer = await pbkdf2Async(password, salt, iterations, keyLength, digest);
  const storedHashBuffer = Buffer.from(storedHashHex, "hex");

  if (storedHashBuffer.length !== hashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedHashBuffer, hashBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
