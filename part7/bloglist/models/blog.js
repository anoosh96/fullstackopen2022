const config = require('../utils/config')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: String,
  likes: {
    type: Number,
    default: 0
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGO_DB_URI

mongoose.connect(mongoUrl)

module.exports = Blog
