const express = require("express");
const { uploadProductImage } = require("../controllers/upload.controller");

function createUploadRoutes(upload) {
  const router = express.Router();
  router.post("/upload", upload.single("product"), uploadProductImage);
  return router;
}

module.exports = { createUploadRoutes };
