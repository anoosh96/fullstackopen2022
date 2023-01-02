import {createSlice} from '@reduxjs/toolkit'
import StorageHelper from '../Utlilities/StorageHelper'

const userSlice = createSlice({
  name: 'user',
  initialState: {loggedInUser: StorageHelper.getFromStorage('user')} || {},
  reducers: {
    setUser(state, action){
      return {loading: false, loggedInUser: action.payload}
    },
    userLoginFailed(state, action){
      return {error: action.payload, loading: false}
    }
  }
})

export const {setUser, userLoginFailed} = userSlice.actions
export default userSlice.reducer
