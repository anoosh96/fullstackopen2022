const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response)=> {
  const result = await User.find({}).populate('phones')

  response.json(result)
})

userRouter.post('/', async (request, response)=> {
  console.log(request.body)
  const {email, password, name} = request.body

  const users = await User.find({})
  if (users.map(user => user.email).includes(email)){
    response.status(400).json({'error': 'email already taken'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    passwordHash,
    name
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

module.exports = userRouter