import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { notify } from '../reducers/notificationReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: { usersList: [] },
  reducers: {
    setUsers(state, action){
      return { ...state, usersList: action.payload } 
    }
  }
})

export default userSlice.reducer
export const { setUsers } = userSlice.actions

export const getAllUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  } catch (error) {
    notify('error fetching users')
  }
}
