import { useState } from 'react'

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
  const [notification, setNotification] = useState(null)
  
  const notify = (msg, isTemporary) => {
    setNotification(msg)
    
    if(isTemporary){
      setTimeout(()=>{
        setNotification(null)
      }, 6000)
    }
  }

  const clear = () => {
    setNotification(null)
  }

  return {
    notification,
    notify,
    clear
  }
}

export { useField, useNotification }
