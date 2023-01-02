import {axiosPrivate} from '../api/axios'

const loginUser = (user) => {
  return axiosPrivate
    .post('/login', user)
    .then((res)=>res.data)
}


export default {loginUser}
