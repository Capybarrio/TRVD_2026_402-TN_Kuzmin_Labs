const express = require("express");
const { uploadProductImage } = require("../controllers/upload.controller");
const { fetchUser, requireRole } = require("../middlewares/auth.middleware");

function createUploadRoutes(upload) {
  const router = express.Router();
  router.post("/upload", fetchUser, requireRole("admin"), upload.single("product"), uploadProductImage);
  return router;
}

module.exports = { createUploadRoutes };
