const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)


describe('blogs api', () => {
  describe('GET /', () => {
    test('returns list of blogs', async () => {
      const resp = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)
      
      expect(resp.body).toHaveLength(helper.initialBlogs.length)
    })

    test('returns list of blogs', async () => {
      const resp = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)
      
      expect(resp.body[0]._id).toBeDefined()
    })
  })

  describe('GET /:id', () => {
    test('returns blog with valid id', async () => {
      const blogs = await helper.blogsInDb()

      const response = await api
        .get(`/api/blogs/${blogs[0].id}`)
        .expect(200)

      expect(response.body.id).toBe(blogs[0].id)
    })

    test('returns 400 with invalid id', async () => {
      const response = await api
        .get(`/api/blogs/4}`)
        .expect(400)

      expect(response.body.error).toBe('malformed id')
    })
  })

  describe('POST /', () => {
    describe('When User is logged in', () => {
      let loggedInUser;

      beforeEach(async ()=>{
        loggedInUser = await api
          .post('/api/login')
          .send({ 
            email: helper.initialUser.email,
            password: helper.initialUser.password
          })
          console.log(loggedInUser);
      })

      test('successfully creates a new blog', async () => {
        const blog = {
          title: 'Blog 1',
          author: 'Author',
          url: 'sampleurl',
          likes: 1
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${loggedInUser.body.token}`)
          .send(blog)
          .expect(201)
  
        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      })

      test('Blog with 0 likes is created, if likes is omitted in request', async () => {
        const blog = {
          title: 'Blog 1',
          author: 'Author',
          url: 'sampleurl',
        }

        const resp = await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${loggedInUser.body.token}`)
          .send(blog)
        
        expect(resp.body.likes).toBe(0)
      })

      test('Blog is not created if title or author is missing', async () => {
        const blog = {
          url: 'sampleurl',
          likes: 3
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${loggedInUser.body.token}`)
          .send(blog)
          .expect(422)
      })
    })
    
    describe('When User is not logged in', () => {
      test('return 401', async () => {
        const blog = {
          title: 'Blog 1',
          author: 'Author',
          url: 'sampleurl',
          likes: 1
        }

        await api
          .post('/api/blogs')
          .send(blog)
          .expect(401)
      })
    })
  })

  describe('PUT /:id', () => {
    describe('When User is logged in', () => {
      let loggedInUser;

      beforeEach(async ()=>{
        loggedInUser = await api
          .post('/api/login')
          .send({ 
            email: helper.initialUser.email,
            password: helper.initialUser.password
          })
          console.log(loggedInUser);
      })

      test('update likes of a post', async () => {
        const blogs = await helper.blogsInDb()
        const updatedBlog = {
          title: blogs[0].title,
          author: blogs[0].author,
          url: blogs[0].url,
          likes: 100
        }

        await api
          .put(`/api/blogs/${blogs[0]._id}`)
          .set('Authorization', `bearer ${loggedInUser.body.token}`)
          .send(updatedBlog)
          .expect(200)

        const updatedBlogs = await helper.blogsInDb()
        expect(updatedBlogs[0].likes).toBe(100)
      })
    })
  })
})

//resetting test db
beforeEach(async ()=> {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  const user = await helper.createUser(helper.initialUser)
  const recObjects = helper.initialBlogs.map(
    rec => new Blog({...rec, user})
  )

  const promiseArray = recObjects.map((rec)=>rec.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  mongoose.connection.close()
})
