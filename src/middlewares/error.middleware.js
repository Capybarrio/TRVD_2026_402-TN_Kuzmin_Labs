function notFoundHandler(req, res) {
  res.status(404).json({ success: false, errors: "Route not found" });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    errors: err.message || "Internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
