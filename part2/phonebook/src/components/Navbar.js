import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'

function Navbar() {

  const user = useSelector(state => state.user.loggedInUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <AppBar position="static" component="nav">
      <Container>
        <Toolbar variant="dense">
          <IconButton edge="start" className="logo" >
            <Link to="/">
              <Box
                component="img" 
                src="/logo.png"
                sx={{height: '50px', width: '50px'}} 
              />
            </Link>
          </IconButton>
          <Button color="primary">
            <Link to="/about">About</Link>
          </Button>
          { user
            ?
            <>
              <Button variant="text">
                <Link to="/create">Add Contact</Link>
              </Button>
              <Button onClick={logoutHandler}>Logout</Button>
              <Typography variant="subtitle" component="div">
                  Logged in: {user.email}
              </Typography>
              </>
            :
            <Button>
              <Link to="/login">Login</Link>
            </Button>    
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
