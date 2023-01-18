import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return ''
    }
  }
})

export default notiSlice.reducer
export const { setNotification, clearNotification } = notiSlice.actions


export const notify = (msg, isTemporary) => (dispatch) => {
  dispatch(setNotification(msg))
  
  if(isTemporary){
    setTimeout(()=>{
      dispatch(clearNotification())
    }, 6000)
  }
}
