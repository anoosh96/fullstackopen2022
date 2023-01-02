import {configureStore} from '@reduxjs/toolkit'
import recordReducer from './reducers/recordReducer'
import createRecordReducer from './reducers/createRecordReducer'
import flashReducer from './reducers/flashReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const middleware = [thunk]
export const store = configureStore({
  reducer: {
    records: recordReducer,
    flash: flashReducer,
    user: userReducer,
    createRecord: createRecordReducer
  },
  middleware
})
