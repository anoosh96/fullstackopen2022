const Phone = require('../models/phone')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialRecords = [
  {
    'name': 'Jon Doe 1',
    'number': '12344434',
    'date': new Date()
  },

  {
    'name': 'Jon Doe 2',
    'number': '1234523424',
    'date': new Date()
  },

  {
    'name': 'Jon Doe 3',
    'number': '1234432423',
    'date': new Date()
  },
]

const initialUser = {
  email: 'tester@test.com',
  name: 'tester',
  password: 'tester1234'
}


const recordsInDb = async () => {
  const phones = await Phone.find({})
  return phones.map(phone=>phone.toJSON())
}

const createUser = async (email, name, password) => {
  console.log(email, name, password);
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    email,
    name,
    passwordHash: hashedPassword 
  })

  await user.save()
  return user
}


module.exports = {initialRecords, initialUser, recordsInDb, createUser}