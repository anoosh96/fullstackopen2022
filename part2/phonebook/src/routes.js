import {createBrowserRouter} from 'react-router-dom'
import Contacts from './routes/Contacts'
import PrivateComponent from './components/PrivateComponent'
import About from './routes/About'
import CreateContact from './routes/CreateContact'
import App from './App'
import Login from './routes/Login'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <PrivateComponent><Contacts /></PrivateComponent>
        },

        {
          path: 'login',
          element: <Login />
        },

        {
          path: 'about',
          element: <About />
        },
    
        {
          path: 'create',
          element: <CreateContact />
        }
      ]
    }
  ]
)

export default router
