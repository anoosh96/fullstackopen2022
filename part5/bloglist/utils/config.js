require('dotenv').config()

const MONGO_DB_URI = process.env.NODE_ENV == 'development'
  ? process.env.MONGO_DB_URI
  : process.env.MONGO_DB_URI_TEST

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { 
  MONGO_DB_URI,
  PORT,
  JWT_SECRET 
}
