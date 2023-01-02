import {createSlice} from '@reduxjs/toolkit'


const recordSlice = createSlice({
  name: 'records',
  initialState: [],
  reducers:{
    listRecords(state, action){
      return action.payload
    },
    addRecord(state, action){
      state.push(action.payload)
    },
    removeRecord(state, action){
      return state.filter(rec=>rec.id !== action.payload)
    },
  }
})

export const {listRecords, addRecord, removeRecord} = recordSlice.actions
export default recordSlice.reducer
