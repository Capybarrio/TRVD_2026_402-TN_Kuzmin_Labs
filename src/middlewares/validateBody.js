function validateBody(validator) {
  return (req, res, next) => {
    const result = validator(req.body);
    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        errors: result.errors,
      });
    }

    req.validatedBody = result.data;
    return next();
  };
}

module.exports = { validateBody };
