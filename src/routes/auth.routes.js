const express = require("express");
const { signupController, loginController } = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validateBody");
const { validateSignupDto, validateLoginDto } = require("../dto/auth.dto");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.post("/signup", validateBody(validateSignupDto), asyncHandler(signupController));
router.post("/login", validateBody(validateLoginDto), asyncHandler(loginController));

module.exports = router;
