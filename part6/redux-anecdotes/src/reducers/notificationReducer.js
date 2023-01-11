import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    notify(state, action){
      return action.payload
    },

    reset(state, action){
      return ''
    }
  }
})

export default notificationSlice.reducer
export const { notify, reset } = notificationSlice.actions
