import { useState, createContext, useEffect } from 'react'

const userContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
  }, [])
  
  return (
    <userContext.Provider value={[user, setUser]}>
       {children}
    </userContext.Provider>
  )
  
}

export {AuthContextProvider, userContext}
