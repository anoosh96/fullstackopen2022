const listHelper = require('../utils/list_helper')

describe('listHelper', () =>{
  test('dummy retruns 1', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  let listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  let listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '3a422aa7gg54a676234d17f8',
      title: 'Health and Diet',
      author: 'Doctor Anderson',
      url: 'http://sampleurl',
      likes: 30,
      __v: 0
    },

  ]

  describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('return total likes of all blog posts', ()=>{
      const result = listHelper.totalLikes(listWithTwoBlogs)
      expect(result).toBe(35)
    })
  })

  describe('favorite blog', () => {
    test('return the blog with most likes', ()=>{
      const result = listHelper.favBlog(listWithTwoBlogs)
      expect(result).toBe(listWithTwoBlogs[1])
    })

    test('return the first blog when likes are same', () => {
      listWithTwoBlogs[0].likes = 30
      const result = listHelper.favBlog(listWithTwoBlogs)
      expect(result).toBe(listWithTwoBlogs[0])
    })
  })
})

