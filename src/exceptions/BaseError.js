class BaseError extends Error {
  constructor(name, httpCode, details, isOperational) {
    super(details);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
