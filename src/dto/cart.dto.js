const { toInteger } = require("./common");

function validateCartItemDto(body) {
  const errors = [];
  const itemId = toInteger(body?.itemId);

  if (itemId === null || itemId < 0) errors.push("itemId must be a non-negative integer");

  return {
    isValid: errors.length === 0,
    errors,
    data: { itemId },
  };
}

module.exports = { validateCartItemDto };
