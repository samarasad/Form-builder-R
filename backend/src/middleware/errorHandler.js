export const errorHandler = (err, req, res, next) => {
  // console.error("Error:", err);

  const status = err.statusCode || 500;

  res.status(status).json({
  success: false,
  errors: err.errors || null
});

};
