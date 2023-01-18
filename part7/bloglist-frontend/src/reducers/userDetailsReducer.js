import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'


const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: null },
  reducers: {
    requestUser(state, action){
      return {...state, loading: true}
    },
    setUser(state, action){
      return { ...state, user: action.payload, loading: false }
    },
    userError(state, action){
      return { ...state, loading: false, error: action.payload }
    }
  }
})

export default userDetailsSlice.reducer
export const { requestUser, setUser, userError } = userDetailsSlice.actions

export const getUser = (id) => async (dispatch) => {
  dispatch(requestUser())
  try {
    const user = await userService.getUser(id)
    dispatch(setUser(user))
  } catch (error) {
    dispatch(userError('error fetching user'))
    notify('error fetching users')
  }
}
