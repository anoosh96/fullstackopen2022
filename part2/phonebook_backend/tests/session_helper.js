const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const loginUser = async (email, password) => {
  const resp = await api
        .post('/api/login')
        .send({email, password})
  
  return resp.body
}

module.exports = {loginUser}