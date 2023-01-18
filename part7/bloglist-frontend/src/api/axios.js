import axios from 'axios'

const axiosPrivate = axios
  .create({baseURL: '/api'})


axiosPrivate.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && !request.headers['Authorization']){         
        const token = user.token
          request.headers['Authorization'] = `bearer ${token}`  
    }
    return request
  },
  (error) => Promise.reject(error)
)
  
export default axiosPrivate
