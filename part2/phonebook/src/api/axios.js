import axios from 'axios'
import StorageHelper from '../Utlilities/StorageHelper'

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
})


axiosPrivate.interceptors.request.use(
  (request) => {
    const user = StorageHelper.getFromStorage('user')
    if(user && !request.headers['Authorization']){         
        const token = user.token
         request.headers['Authorization'] = `bearer ${token}`  
    }
    return request
  },
  (error) => Promise.reject(error)
)

//add interceptor for response to handle token expiration and retry

export {axiosPrivate}
