const { HttpStatusCode } = require("../constants");
const BaseError = require("./BaseError");

class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    details,
    isOperational = true
  ) {
    super(name, httpCode, details, isOperational);
  }
}

module.exports = APIError;
