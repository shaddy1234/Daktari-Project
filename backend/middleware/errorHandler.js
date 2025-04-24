/**
 * Global error handling middleware
 */
function errorHandler(err, req, res, next) {
  console.error("Error:", err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    error: message,
    // Include stack trace in development environment only
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = {
  errorHandler,
};
