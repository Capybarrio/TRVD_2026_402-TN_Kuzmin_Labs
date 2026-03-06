const {
  addProduct,
  removeProductById,
  getAllProducts,
  getNewCollections,
  getPopularInWomen,
} = require("../services/product.service");

async function addProductController(req, res) {
  const product = await addProduct(req.validatedBody);
  return res.json({
    success: true,
    name: product.name,
  });
}

async function removeProductController(req, res) {
  await removeProductById(req.validatedBody.id);
  return res.json({
    success: true,
    name: req.body?.name,
  });
}

async function getAllProductsController(req, res) {
  const products = await getAllProducts();
  return res.send(products);
}

async function getNewCollectionsController(req, res) {
  const collection = await getNewCollections();
  return res.send(collection);
}

async function getPopularInWomenController(req, res) {
  const products = await getPopularInWomen();
  return res.send(products);
}

module.exports = {
  addProductController,
  removeProductController,
  getAllProductsController,
  getNewCollectionsController,
  getPopularInWomenController,
};
