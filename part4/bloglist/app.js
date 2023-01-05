const express = require('express')
const app = express()
const cors = require('cors')
const { requestLogger, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', tokenExtractor, userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
