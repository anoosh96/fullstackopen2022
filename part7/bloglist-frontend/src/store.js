import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import userDetailsReducer from './reducers/userDetailsReducer'
const middleware = [thunk]

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
    users: userReducer,
    userDetails: userDetailsReducer
  },
  middleware: middleware
})

export default store
