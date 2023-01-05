const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { AuthorizationError, NotFoundError } = require('../utils/errors')

blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }
  catch(err){
    next(err)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const user = request.user
  const blog = new Blog({...request.body, user})

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  }
  catch(err){
    next(err)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const blog = await Blog.findById(id)
    if(!blog) { throw new NotFoundError('record not found') }
    response.json(blog)
  }
  catch(err){
    next(err)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const { likes } = request.body
  try{
    const updatedBlog = await Blog
      .findByIdAndUpdate(id, { likes }, { new: true })

    response.status(201).json(updatedBlog)
  }
  catch(err){
    next(err)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findOne({ _id: request.params.id })
    
    if(String(request.user._id) !== String(blog.user)){
      throw new AuthorizationError('user unauthorized')
    }

    await blog.delete()
    response.status(204).end()
  }
  catch(err){
    next(err)
  }
})

module.exports = blogRouter
