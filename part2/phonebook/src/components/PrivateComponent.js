import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateComponent = ({children}) => {
  const user = useSelector(state => state.user?.loggedInUser)
  
  if(user){
    return children
  }
  return <Navigate to="/login" replace />
}

export default PrivateComponent