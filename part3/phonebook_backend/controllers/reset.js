const Phone = require('../models/phone')
const User = require('../models/user')
const resetRouter = require('express').Router()



resetRouter.post('/reset', async (req, res) => {
  await Phone.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})


module.exports = resetRouter
