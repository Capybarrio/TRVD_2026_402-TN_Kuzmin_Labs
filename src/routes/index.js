const healthRoutes = require("./health.routes");
const productRoutes = require("./product.routes");
const authRoutes = require("./auth.routes");
const cartRoutes = require("./cart.routes");
const { createUploadRoutes } = require("./upload.routes");

function registerRoutes(app, dependencies) {
  app.use(healthRoutes);
  app.use(productRoutes);
  app.use(authRoutes);
  app.use(cartRoutes);
  app.use(createUploadRoutes(dependencies.upload));
}

module.exports = { registerRoutes };
