const path = require("path");
const express = require("express");
const cors = require("cors");

const env = require("./config/env");
const { buildUploader } = require("./config/upload");
const { registerRoutes } = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

function createApp() {
  const app = express();
  const upload = buildUploader(env.uploadDir);

  app.use(express.json());
  app.use(cors());
  app.use("/images", express.static(path.join(__dirname, "../upload/images")));

  registerRoutes(app, { upload });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
