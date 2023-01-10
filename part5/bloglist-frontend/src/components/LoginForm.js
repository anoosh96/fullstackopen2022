import { useField } from '../hooks'

const LoginForm = ({ submitHandler }) => {

  const email = useField('email', {id: 'email'})
  const password = useField('password', {id: 'password'})

  const login = (event) => {
    event.preventDefault()
    submitHandler(email.value, password.value)
  }
  
  return (
    <div>
      <form onSubmit={login}>
        <div>
          <label>Email:</label>
          <input {...email} />
        </div>
        <div>
          <label>Password:</label>
          <input {...password} />
        </div>
        <input type="submit" value="login" id="login-btn" />
      </form>  
    </div>
  )
}

export default LoginForm
