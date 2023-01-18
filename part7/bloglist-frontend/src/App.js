import { useContext } from 'react'
import Notification from './components/Notification'
import { userContext } from './contexts/AuthContextProvider'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import Blogs from './routes/Blogs'
import Login from './routes/Login'
import Users from './routes/Users'
import UserDetails from './routes/UserDetails'
import Header from './components/Header'
import BlogDetails from './routes/BlogDetails'

const App = () => {
  //const notifier = useNotification()
  const notification = useSelector(state => state.notification)
  const user = useContext(userContext)

  

  return (
    <div className="container">
      {/* Header */}
      <Header />
      {notification && <Notification msg={notification}/>}
      <Routes>
        <Route 
          path="/" 
          element={ 
            user 
              ? <Blogs /> 
              : <Navigate to="/login"/>
          }
        >
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route 
          path="/users" 
          element={ 
            user 
              ? <Users /> 
              : <Navigate to="/login"/>
          }
        >
        </Route>
        <Route 
          path="/users/:id" 
          element={ 
            user 
              ? <UserDetails /> 
              : <Navigate to="/login"/>
          }
        >
        </Route>
        <Route 
          path="/blogs/:id" 
          element={ 
            user 
              ? <BlogDetails /> 
              : <Navigate to="/login"/>
          }
        >
        </Route>

      </Routes> 
    </div>
  )
}

export default App
