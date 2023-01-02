const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)



describe('/controllers/user', ()=>{
  describe('POST /', ()=>{
    test('user is created with fresh email and valid data', async ()=>{
      const user = {
        email: 'jondoe2@test.com',
        name: 'Jon Doe 4',
        password: 'kal342423'
      }

      await api
        .post('/api/users').send(user)
        .expect(201)

      const result = await User.find({})
      const emails = result.map(res=>res.email)
      expect(emails).toContain(user.email)
    })

    test('returns error with already used email', async ()=>{
      const user = {
        email: 'jondoe@test.com',
        name: 'Jon Doe 4',
        password: 'kal342423'
      }

      const response = await api
        .post('/api/users').send(user)
        .expect(400)

      expect(response.body.error).toContain('email already taken')
    })
  })
})


//resetting db
beforeEach(async ()=>{
  await User.deleteMany()

  const passHash = await bcrypt.hash('saltpass123', 10)
  const user = new User({
    email: 'jondoe@test.com',
    name: 'Jon Doe',
    passwordHash: passHash
  })

  await user.save()
})

//close connection with db
afterAll(() => {
  mongoose.connection.close()
})