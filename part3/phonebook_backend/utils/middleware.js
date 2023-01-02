const logger = require('./logger')
const jwtHelper = require('./jwt_helper')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  // ...
  
  if(error.name === 'ValidationError'){
    response.status(422).json({error: error.message})
  }
  else if(error.name === 'CastError'){
    response.status(400).json({error: 'malformed id'})
  }
  else if(error.name === 'JsonWebTokenError'){
    response.status(401).json({error: 'invalid token'})
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  logger.error(error);
  next(error)
}

const requestLogger = (request, response, next) => {
  if(process.env.NODE_ENV !== 'test'){
    logger.info(`Method: ${request.method}`)
    logger.info(`Path: ${request.path}`)
    logger.info(`Body: ${JSON.stringify(request.body)}`)
    logger.info('---')
  }
  next()
}

const checkToken = (request, response, next) => {

  const token = jwtHelper.getTokenFrom(request)

  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.token = decodedToken
  
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token){
    const user = await User.findOne({_id: request.token.id})
    console.log("User From Token: ", user)
    request.user = user
  }
  else{
    request.user = null
  }
  next()
}



module.exports = {unknownEndpoint, errorHandler, requestLogger, checkToken, userExtractor}
