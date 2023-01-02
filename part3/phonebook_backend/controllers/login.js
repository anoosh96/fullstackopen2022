const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const {email, password} = request.body
  const user = await User.findOne({email})
  
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    response.status(401).json({
      'error': 'incorrect username or password'
    })
  }

  const userForToken = {
    email,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET, {expiresIn: 60*60})

  response.status(200).send({token, email, name: user.name})
})


module.exports = loginRouter