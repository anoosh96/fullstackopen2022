import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../contexts/AuthContextProvider"
import LoginForm from "../components/LoginForm"
import { useDispatch } from "react-redux"
import { login } from "../reducers/loginReducer"

const Login = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (email, password) => {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [user])

  return (
    <div>
      <h2>Please Login</h2>
      <LoginForm submitHandler={loginHandler} />
    </div>
  )
}

export default Login
