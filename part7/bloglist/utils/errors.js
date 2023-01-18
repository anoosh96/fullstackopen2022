class AuthError extends Error {
  constructor(message){
    super(message)
    this.name = 'AuthError'
  }
}

class AuthorizationError extends Error {
  constructor(message){
    super(message)
    this.name = 'AuthorizationError'
  }
}

class NotFoundError extends Error {
  constructor(message){
    super(message)
    this.name = 'NotFoundError'
  }
}

module.exports = {
  AuthError,
  AuthorizationError,
  NotFoundError
}
