const express = require("express");
const {
  addToCartController,
  removeFromCartController,
  getCartController,
} = require("../controllers/cart.controller");
const { fetchUser } = require("../middlewares/auth.middleware");
const { validateBody } = require("../middlewares/validateBody");
const { validateCartItemDto } = require("../dto/cart.dto");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.post("/addtocart", fetchUser, validateBody(validateCartItemDto), asyncHandler(addToCartController));
router.post("/removefromcart", fetchUser, validateBody(validateCartItemDto), asyncHandler(removeFromCartController));
router.post("/getcart", fetchUser, asyncHandler(getCartController));

module.exports = router;
