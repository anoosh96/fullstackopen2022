import axiosPrivate from '../api/axios'

const getAll = () => {
  const request = axiosPrivate.get('/blogs')
  return request.then(response => response.data)
}

const createBlog = (blog) => {
  const request = axiosPrivate.post('/blogs', blog)
  return request.then(response => response.data)
}

const updateBlog = (blog) => {
  const request = axiosPrivate.put(`/blogs/${blog._id}`, blog)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axiosPrivate.delete(`/blogs/${id}`)
  return request.then(response => response.data)
}

export default { getAll, createBlog, updateBlog, deleteBlog }
