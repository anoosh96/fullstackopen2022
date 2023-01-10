import axiosPrivate from '../api/axios'

const loginUser = ({email, password}) => {
  console.log(email, password);
  const request = axiosPrivate.post('/login', { email, password })
  return request.then(response => response.data)
}

export default { loginUser }
