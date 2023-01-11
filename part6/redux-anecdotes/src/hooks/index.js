import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { notify, reset } from '../reducers/notificationReducer'

export const useNotifier = (timeout = 5000) => {
  const notification = useSelector(state => state.notification)
  const timer = useRef(null)
  const dispatch = useDispatch()
 
  const notifyUser = (msg) => { 
    clearTimeout(timer.current)
    dispatch(notify(msg))

    let timerId_ = setTimeout(()=>{
      dispatch(reset())
    }, 5000)
    timer.current = timerId_
  }

  return {
    notification,
    notifyUser
  }
}

export default useNotifier
