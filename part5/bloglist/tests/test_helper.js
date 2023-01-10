const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Health and Diet',
    author: 'Doctor Anderson',
    url: 'http://sampleurl',
    likes: 30
  },
]

const initialUser = {
  email: 'tester@test.com',
  name: 'tester',
  password: 'tester1234',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b)=>b.toJSON())
}

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const newUser = new User({
    email: user.email,
    name: user.name,
    passwordHash: hashedPassword 
  })

  await newUser.save()
  return newUser
}

module.exports = { 
  initialBlogs,
  blogsInDb, 
  initialUser, 
  createUser 
}
