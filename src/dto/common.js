function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toInteger(value) {
  const number = toNumber(value);
  if (number === null) {
    return null;
  }

  return Number.isInteger(number) ? number : null;
}

module.exports = {
  isNonEmptyString,
  toNumber,
  toInteger,
};
