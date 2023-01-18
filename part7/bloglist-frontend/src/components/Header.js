import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../contexts/AuthContextProvider'

const Header = () => {
  const user = useContext(userContext)

  const logout = () => {
    dispatch(logoutUser())
    localStorage.clear()
  }

  return (
    <nav>
      <h1>Blog App</h1>
      <ul>
        {user
          ?
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/">Blogs</Link>
            </li>
            <li>
              logged in as: {user.email}
              <button onClick={logout}>logout</button>
            </li>
          </>
          :
          <li>
            <Link to="/login">Login</Link>
          </li>
        }
      </ul>
    </nav>
  )
}
 export default Header
