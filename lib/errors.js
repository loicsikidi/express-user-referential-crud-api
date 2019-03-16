class CustomError extends Error {
    constructor ( message ) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'CustomError'
      this.message = message
      this.status = 500
    }
}

class NotFoundError extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'not_found';
      this.status = 404
    }
}

class ForbiddenError extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'forbidden';
      this.status = 403
    }
}

class DuplicateError extends CustomError {
  constructor(...params) {
    super(...params);
    this.name = 'conflict';
    this.status = 409
  }
}

class InternalError extends CustomError {
  constructor(...params) {
    super(...params);
    this.name = 'internal_error';
    this.status = 500
  }
}

class UnauthorizedError extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'unauthorized';
      this.status = 401
    }
}


module.exports = {
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
    DuplicateError,
    InternalError
}