import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const useField = (type, options) => {
  const [value, setvalue] = useState('')

  const onChange = (e) => {
    setvalue(e.target.value)
  }
  
  return {
    type,
    value,
    onChange,
    ...options
  }
}

const useNotification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  
  const notify = (msg, isTemporary) => {
    dispatch(setNotification(msg))
    
    if(isTemporary){
      setTimeout(()=>{
        dispatch(clearNotification())
      }, 6000)
    }
  }

  const clear = () => {
    dispatch(clearNotification())
  }

  return {
    notification,
    notify,
    clear
  }
}

export { useField, useNotification }
