const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const mongoose = require('mongoose')
const recordRouter = require('./controllers/phones')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {unknownEndpoint, errorHandler, requestLogger, checkToken, userExtractor} = require('./utils/middleware')
const logger = require('./utils/logger')

const url = config.MONGODB_URI

mongoose
  .connect(url)
  .then(res=>{
    logger.info('mongodb connected successfully');
  })
  .catch(err=>{
    logger.error('mongodb connection failed', err.message);
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/records', checkToken, userExtractor, recordRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV == 'test'){
  const resetRouter = require('./controllers/reset')
  app.use('/api/testing', resetRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

//app.listen(config.PORT)

module.exports = app
