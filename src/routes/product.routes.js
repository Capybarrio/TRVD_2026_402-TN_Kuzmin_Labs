const express = require("express");
const {
  addProductController,
  removeProductController,
  updateProductController,
  getAllProductsController,
  getNewCollectionsController,
  getPopularInWomenController,
} = require("../controllers/product.controller");
const { asyncHandler } = require("../utils/asyncHandler");
const { validateBody } = require("../middlewares/validateBody");
const {
  validateAddProductDto,
  validateRemoveProductDto,
  validateUpdateProductDto,
} = require("../dto/product.dto");
const { fetchUser, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/addproduct",
  fetchUser,
  requireRole("admin"),
  validateBody(validateAddProductDto),
  asyncHandler(addProductController),
);
router.post(
  "/removeproduct",
  fetchUser,
  requireRole("admin"),
  validateBody(validateRemoveProductDto),
  asyncHandler(removeProductController),
);
router.post(
  "/updateproduct",
  fetchUser,
  requireRole("admin"),
  validateBody(validateUpdateProductDto),
  asyncHandler(updateProductController),
);
router.get("/allproducts", asyncHandler(getAllProductsController));
router.get("/newcollections", asyncHandler(getNewCollectionsController));
router.get("/popularinwomen", asyncHandler(getPopularInWomenController));

module.exports = router;
