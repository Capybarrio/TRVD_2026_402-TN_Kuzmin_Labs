const { addToCart, removeFromCart, getCart } = require("../services/cart.service");

async function addToCartController(req, res) {
  await addToCart(req.user.id, req.validatedBody.itemId);
  return res.send("Added");
}

async function removeFromCartController(req, res) {
  await removeFromCart(req.user.id, req.validatedBody.itemId);
  return res.send("Removed");
}

async function getCartController(req, res) {
  const cart = await getCart(req.user.id);
  return res.json(cart);
}

module.exports = {
  addToCartController,
  removeFromCartController,
  getCartController,
};
