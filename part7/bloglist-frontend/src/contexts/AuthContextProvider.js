import { createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

const userContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const user = useSelector(state => state.user)
  
  return (
    <userContext.Provider value={user}>
       {children}
    </userContext.Provider>
  )
  
}

export {AuthContextProvider, userContext}
