import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { notify } from '../reducers/notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: JSON.parse(localStorage.getItem('user')) || null,
  reducers: {
    loginUser(state, action){
      return action.payload
    },
    logoutUser(state, action){
      return null
    }
  }
})

export default loginSlice.reducer
export const { loginUser, logoutUser } = loginSlice.actions


export const login = (user) => async (dispatch) => {
  try{
    const loggedInUser = await loginService
      .loginUser(user)
    dispatch(loginUser(loggedInUser))
    localStorage.setItem('user', JSON.stringify(loggedInUser))
  }
  catch(err){
    dispatch(notify('invalid credentials', true))
  }
}
