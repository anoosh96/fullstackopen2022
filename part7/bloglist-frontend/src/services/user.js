import axiosPrivate from '../api/axios'

const getAll = () => {
  const request = axiosPrivate.get('/users')
  return request.then(response => response.data)
}

const getUser = (id) => {
  const request = axiosPrivate.get(`/users/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getUser }
