const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const { AuthError } = require('../utils/errors')

loginRouter.post('/', async (request, response, next) => {
  const {email, password} = request.body

  try{
    const user = await User.findOne({ email })

    const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect){
      throw new AuthError('invalid credentials')
    }
    
    const userToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt
      .sign(
        userToken,
        process.env.JWT_SECRET,
        { expiresIn: 60000 }
      )

    response.json({ token: token, email: user.email, id: user._id })
  }
  catch(err){
    next(err)
  }
})

module.exports = loginRouter
