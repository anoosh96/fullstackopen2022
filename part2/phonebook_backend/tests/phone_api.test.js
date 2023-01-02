const { request } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Phone = require('../models/phone')
const User = require('../models/user')
const helper = require('../utils/test_helper')

const api = supertest(app)
const sessionHelper = require('./session_helper')

describe('/controllers/phone', ()=>{

  describe('GET /', ()=>{
    
    let loggedInUser
    
    beforeEach(async () => {
      loggedInUser = await sessionHelper.loginUser(helper.initialUser.email, helper.initialUser.password)
    })

    test('records are returned as json', async () => {
      await api
        .get('/api/records')
        .set('Authorization', `bearer ${loggedInUser.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all records are returned', async () => {
      const response = await api
        .get('/api/records')
        .set('Authorization', `bearer ${loggedInUser.token}`)

      expect(response.body).toHaveLength(helper.initialRecords.length)
    })
  })

  describe('GET /:id', ()=> {
    test('correct record is returned', async ()=>{
      const loggedInUser = await sessionHelper.loginUser(helper.initialUser.email, helper.initialUser.password)

      const rec = await new Phone({'name': 'Joe L', 'number': '234234243', 'date': new Date()}).save()
      const response = await api
        .get(`/api/records/${rec.id}`)
        .set('Authorization', `bearer ${loggedInUser.token}`)

      expect(response.status).toBe(200)
      expect(response.body.name).toContain('Joe L')
    })
  })

  describe('POST /', ()=>{
    test('record with correct data is added successfully', async ()=> {

      const user = await helper.createUser('ahmed123@test.com', 'ahmed', 'pass123445')

      const loggedInUserResponse = await sessionHelper.loginUser(user.email, 'pass123445')

      const rec = {
        'name': 'Jon Doe 5',
        'number': '3242342423'
      }

      const savedRecord = await api
        .post('/api/records')
        .set('Authorization', `bearer ${loggedInUserResponse.token}`)
        .send(rec)
        .expect(201)
      
      const records = await helper.recordsInDb() 
      const names = records.map(rec => rec.name)
      console.log(user)

      expect(names).toContain('Jon Doe 5')
      expect(savedRecord.body.user).toBe(JSON.parse(JSON.stringify(user._id)))
    })

    test('record with invalid data return error', async ()=> {
      const user = await helper.createUser('ahmed123@test.com', 'ahmed', 'pass123445')
      const loggedInUserResponse = await sessionHelper.loginUser(user.email, 'pass123445')

      const rec = {
        'name': 'Jon',
        'number': '3ad'
      }

      await api
        .post('/api/records')
        .set('Authorization', `bearer ${loggedInUserResponse.token}`)
        .send(rec)
        .expect(422)
    })

    test('returns error if user tries to add phone without being logged in', async () => {
      const user = await helper.createUser('ahmed123@test.com', 'ahmed', 'pass123445')

      const rec = {
        'name': 'Jon Doe 5',
        'number': '3242342423'
      }

      await api
        .post('/api/records')
        .send(rec)
        .expect(401)
    })
  })

  describe('DELETE /:id', () => {
    test('user cannot delete a phone if they are not owner', async () => {
      const user = await helper.createUser('ahmed123@test.com', 'ahmed', 'pass123445')

      const loggedInUserResponse = sessionHelper.loginUser(user.email, 'pass123445')

      const phones = await helper.recordsInDb()

      await api
        .delete(`/api/records/${phones[0]._id}`)
        .set('Authorization', `bearer ${loggedInUserResponse.token}`)
        .expect(401)
    })
  })
})


//resetting test db
beforeEach(async ()=> {

  await Phone.deleteMany({})
  await User.deleteMany({})

  const user = await helper.createUser(helper.initialUser.email, helper.initialUser.name, helper.initialUser.password)

  const recObjects = helper.initialRecords.map(rec => new Phone({...rec, user: user._id}))

  const promiseArray = recObjects.map((rec)=>rec.save())
  await Promise.all(promiseArray)
})



//close connection with db
afterAll(() => {
  mongoose.connection.close()
})