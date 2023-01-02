import LoginForm from "../components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../actions/userActions"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Alert, Box, Typography } from "@mui/material"

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const loginHandler = async (user) => {
    console.log('logged in');
    dispatch(loginUser(user))
  }

  useEffect(()=>{
    if(user.loggedInUser){
      navigate("/")
    }
  }, [user.loggedInUser])

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        {user.error && <Alert severity="error">{user.error}</Alert> }
        <Typography variant="h4">Login:</Typography>
        <LoginForm loginHandler={loginHandler}/>
      </Box>
    </Box>
  )
}

export default Login
