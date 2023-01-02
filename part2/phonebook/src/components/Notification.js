import { seeFlashMessage } from '../reducers/flashReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Alert } from '@mui/material'

const Notification = ({msg, type}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(seeFlashMessage())
  }, [])

  return (
    <Alert severity={type}>
      {msg} 
    </Alert>
  )
}

export default Notification
