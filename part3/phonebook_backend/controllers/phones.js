const recordRouter = require('express').Router()
const Phone = require('../models/phone')
const User = require('../models/user')

recordRouter.get('/', async (req, res) => {
  const result = await Phone.find({user: req.user._id}).populate('user')
  res.json(result)
})

recordRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const record = await Phone.findById(id).populate('user')
  res.json(record)

})

recordRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const phone = await Phone.findById(id)
  
  if(Object.is(req.user._id, phone.user)){
    return res.status(401).json({'error': 'user not authorized'})
  }
  
  await phone.delete()
  res.status(204).end()
})

recordRouter.post('/', async (req, res)=>{
  const {name, number} = req.body
  const user = req.user

  const phone = new Phone({
    name,
    date: new Date(),
    number,
    user: user._id
  })

  const saved = await phone.save()

  user.phones = user.phones.concat(phone._id)
  await user.save()
  res.status(201).json(saved)
})


recordRouter.put('/:id', async (req, res)=>{
  const {name, number} = req.body

  const result = await Phone.findByIdAndUpdate(req.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
  res.status(201).json(result)
})

module.exports = recordRouter
