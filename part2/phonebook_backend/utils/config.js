require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV == 'development'
  ? process.env.MONGO_DB_URI
  : process.env.TEST_MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET
};
