function uploadProductImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, errors: "Product image is required" });
  }

  return res.json({
    success: 1,
    image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
}

module.exports = { uploadProductImage };
