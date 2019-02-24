class CustomError extends Error {
    constructor ( message ) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'CustomError'
      this.message = message
      this.status = 500
    }
}

class NotFoundException extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'not_found';
      this.status = 404
    }
}

class ForbiddenException extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'forbidden';
      this.status = 403
    }
}

class DuplicateException extends CustomError {
  constructor(...params) {
    super(...params);
    this.name = 'conflict';
    this.status = 409
  }
}

class UnauthorizedException extends CustomError {
    constructor(...params) {
      super(...params);
      this.name = 'unauthorized';
      this.status = 401
    }
}


module.exports = {
    NotFoundException,
    ForbiddenException,
    UnauthorizedException,
    DuplicateException
}