import { Button, TextField, Box } from "@mui/material"
import { useState } from "react"

const LoginForm = ({loginHandler}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const loginUser = (event) => {
    event.preventDefault()
    loginHandler({email, password})
  }

  return (
    <Box component="form" onSubmit={loginUser}>
      <Box mb={1}>
        <TextField
          label="email" 
          id="login-email"
          type="text" 
          value={email}
          margin="dense" 
          onChange={emailHandler}
          required
        />
      </Box>
      <Box mb={1}>
        <TextField
          label="password"
          id="login-password" 
          type="password" 
          value={password}
          onChange={passwordHandler}
          required
        />
      </Box>
      <Button 
        type="submit" 
        value="Login" 
        id="login-button"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Box>
  )
}

export default LoginForm
