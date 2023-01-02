import {createSlice} from '@reduxjs/toolkit'

const flashSlice = createSlice({
  name: 'flash',
  initialState: {},
  reducers: {
    addFlashMessage(state, action){
      return {
        type: action.payload.type,
        msg: action.payload.msg
      }
    },
    seeFlashMessage(state, action){
      return {
        ...state,
        seen: true
      }
    },
    resetFlashMessage(state, action){
      return {}
    }
  }
})

export const {addFlashMessage, resetFlashMessage, seeFlashMessage} = flashSlice.actions
export default flashSlice.reducer
