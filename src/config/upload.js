const fs = require("fs");
const path = require("path");
const multer = require("multer");

function buildUploader(uploadDir) {
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  return multer({ storage });
}

module.exports = { buildUploader };
