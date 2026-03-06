const { isNonEmptyString, toInteger, toNumber } = require("./common");

function validateAddProductDto(body) {
  const errors = [];
  const name = body?.name;
  const image = body?.image;
  const category = body?.category;
  const newPrice = toNumber(body?.new_price);
  const oldPrice = toNumber(body?.old_price);

  if (!isNonEmptyString(name)) errors.push("name is required");
  if (!isNonEmptyString(image)) errors.push("image is required");
  if (!isNonEmptyString(category)) errors.push("category is required");
  if (newPrice === null || newPrice < 0) errors.push("new_price must be a non-negative number");
  if (oldPrice === null || oldPrice < 0) errors.push("old_price must be a non-negative number");

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name: typeof name === "string" ? name.trim() : name,
      image: typeof image === "string" ? image.trim() : image,
      category: typeof category === "string" ? category.trim() : category,
      new_price: newPrice,
      old_price: oldPrice,
    },
  };
}

function validateRemoveProductDto(body) {
  const errors = [];
  const id = toInteger(body?.id);

  if (id === null || id <= 0) errors.push("id must be a positive integer");

  return {
    isValid: errors.length === 0,
    errors,
    data: { id },
  };
}

module.exports = {
  validateAddProductDto,
  validateRemoveProductDto,
};
