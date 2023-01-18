const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {userValidator} = require('../utils/middleware')
const jwt = require('jsonwebtoken')


userRouter.get('/', async (request, response, next) => {
  try{
    const users = await User.find({}).populate('blogs')
    response.json(users)
  }
  catch(err){
    next(err)
  }
})

userRouter.get('/:id', async (request, response, next) => {
  try{
    const user = await User.findById(request.params.id).populate('blogs')
    if(!user) { throw new NotFoundError('record not found') }
    response.json(user)
  }
  catch(err){
    next(err)
  }
})

userRouter.post('/', userValidator, async (request, response, next) => {
  const { 
    email,
    password,
    passwordConfirmation,
    name 
  } = request.body

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({ passwordHash, email, name })

  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(err){
    next(err)
  }

})

module.exports = userRouter
