const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")
const { getTokenFrom } = require('../utils/jwt_helper')
const User = require("../models/user")

const requestLogger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)

  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if(['ValidationError', 'MongooseError'].includes(error.name)){
    response.status(422).json({error: error.message})
  }
  else if(error.name === 'CastError'){
    response.status(400).json({error: 'malformed id'})
  }
  else if(error.name == 'AuthError'){
    response.status(401).json({error: 'invalid credentials'})
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  else if (error.name === 'AuthorizationError') {
    return response.status(401).json({
      error: 'user not authorized'
    })
  }
  else if (error.name === 'NotFoundError') {
    return response.status(404).json({
      error: 'record not found'
    })
  }

  next()
}

const userValidator = (request, response, next) => {
  const { 
    password,
    passwordConfirmation 
  } = request.body

  const passwordValid = password.length > 3 

  if(password !== passwordConfirmation){
    next(new Error('Passwords don\'t match'))
  }

  if(!passwordValid){
    next(new Error('Password too short'))
  }

  next()
}

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request)
  try{
    const decodedToken = jwt.verify(token, JWT_SECRET)
    
    if(!decodedToken.id){
      next(new jwt.JsonWebTokenError('invalid token'))
    }

    request.token = decodedToken
  }
  catch(err){
    next(err)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  try{ 
    if(token){
      const user = await User.findOne({_id: token.id})
      request.user = user
    }
    else{
      request.user = null
    }
  }
  catch(err){
    next(err)
  }

  next()
}

module.exports = { 
  requestLogger,
  errorHandler, 
  userValidator,
  tokenExtractor,
  userExtractor
}
