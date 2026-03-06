const { findUserById, updateUserCart } = require("./user.service");

async function addToCart(userId, itemId) {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!user.cartData[itemId]) {
    user.cartData[itemId] = 0;
  }

  user.cartData[itemId] += 1;
  await updateUserCart(userId, user.cartData);
}

async function removeFromCart(userId, itemId) {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (user.cartData[itemId] > 0) {
    user.cartData[itemId] -= 1;
  }

  await updateUserCart(userId, user.cartData);
}

async function getCart(userId) {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user.cartData;
}

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
