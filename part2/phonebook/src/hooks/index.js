import { resetFlashMessage } from "../reducers/flashReducer"
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from "react-router-dom";

const useFlash = () => {
  const flash = useSelector(state => state.flash)
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(flash.msg && flash.seen){
      dispatch(resetFlashMessage())
    }
  }, [location, dispatch])

  return flash
}

export {useFlash}
