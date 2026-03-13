const Users = require("../models/user.model");

function createDefaultCart() {
  const cart = {};
  for (let i = 0; i < 300; i += 1) {
    cart[i] = 0;
  }
  return cart;
}

async function findUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser({ username, email, password }) {
  const user = new Users({
    name: username,
    email,
    password,
    cartData: createDefaultCart(),
  });

  await user.save();
  return user;
}

async function findUserById(id) {
  return Users.findOne({ _id: id });
}

async function updateUserCart(id, cartData) {
  return Users.findOneAndUpdate({ _id: id }, { cartData });
}

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserCart,
};
