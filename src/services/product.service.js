const Product = require("../models/product.model");

async function getNextProductId() {
  const lastProduct = await Product.findOne().sort({ id: -1 }).lean();
  return lastProduct ? lastProduct.id + 1 : 1;
}

async function addProduct(payload) {
  const id = await getNextProductId();
  const product = new Product({ id, ...payload });
  await product.save();
  return product;
}

async function removeProductById(id) {
  return Product.findOneAndDelete({ id });
}

async function getAllProducts() {
  return Product.find({});
}

async function getNewCollections() {
  const products = await Product.find({});
  return products.slice(1).slice(-8);
}

async function getPopularInWomen() {
  const products = await Product.find({ category: "women" });
  return products.slice(0, 4);
}

module.exports = {
  addProduct,
  removeProductById,
  getAllProducts,
  getNewCollections,
  getPopularInWomen,
};
