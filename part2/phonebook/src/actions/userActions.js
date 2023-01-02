import LoginService from '../services/LoginService'
import {setUser, userLoginFailed} from '../reducers/userReducer'
import StorageHelper from '../Utlilities/StorageHelper'

export const loginUser = (user) => async (dispatch) => {
  try {
    const loggedInUser = await LoginService.loginUser(user)
    console.log(loggedInUser);
    StorageHelper.addToStorage('user', JSON.stringify(loggedInUser))
    dispatch(setUser(loggedInUser))
  }
  catch(error) {
    console.log('Error');
    dispatch(userLoginFailed(error?.response?.data?.error))
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch(setUser(null))
  StorageHelper.clearStorage()
}
