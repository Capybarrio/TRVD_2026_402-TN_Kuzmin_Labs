const path = require("path");

const env = {
  port: Number(process.env.PORT) || 4000,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://mykhailo:08051405@cluster0.phe1ky4.mongodb.net/E-commerce",
  mongoUriDirect: process.env.MONGO_URI_DIRECT || "",
  jwtSecret: process.env.JWT_SECRET || "secret_ecom",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30m",
  uploadDir: path.join(__dirname, "../../upload/images"),
};

module.exports = env;
