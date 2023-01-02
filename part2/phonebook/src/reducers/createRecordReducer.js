import {createSlice} from '@reduxjs/toolkit'

const createRecord = createSlice({
  name: "createRecord",
  initialState: {},
  reducers: {
    addRecordRequest(state, action) {
      return { loading: true };
    },
    addRecordSuccess(state, action) {
      return { loading: false, record: action.payload };
    },
    addRecordFail(state, action) {
      return { loading: false, error: action.payload };
    },
    addRecordReset(state, action) {
      return {};
    },
  },
});

export const {
  addRecordRequest,
  addRecordSuccess,
  addRecordFail,
  addRecordReset,
} = createRecord.actions;
export default createRecord.reducer;
