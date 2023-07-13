const APIError = require("./exceptions/ApiError");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, _req, res, _next) {
  if (err instanceof APIError) {
    res.status(err.httpCode);
    return res.json({
      message: err.name,
      isOperationalError: err.isOperational,
      trace: {
        ...err.details
      }
    });
  }
  return res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    response: err.response ? err.response.data : null
  });
}

module.exports = {
  notFound,
  errorHandler
};
