import Axios from "axios";
import * as types from '../constants/actionTypes';

// success
export const logIn = (user) => ({
  type: types.LOGIN,
  payload: user.data,
})

// failure
export const loginFailed = (err) => ({
  type: types.LOGIN_FAILED,
  payload: err,
})

export const signupFailed = (err) => ({
  type: types.SIGNUP_FAILED,
  payload: err,
})

export const userLogin = (email, password) => dispatch => {
  return Axios.post('/login', {email: email, password: password})
    .then(user => dispatch(logIn(user)))
    .catch(err => {
      console.log("Login user: ", err);
      dispatch(loginFailed(err))
    })
    // .catch(err => dispatch(loginFailed(err)))
}
export const userSignup = (fullName, email, password) => dispatch => {
  return Axios.post('/api/user', {fullName: fullName, email: email, password: password})
    .then(user => dispatch(logIn(user)))
    .catch(err => dispatch(signupFailed(err)))
}
export const inSession = () => dispatch => {
  return Axios.get('/api/user')
    .then(user => dispatch(logIn(user)))
    .catch(err => dispatch(signupFailed(err)))
}

export const enterEmail = (value) => ({
  type: types.ENTER_EMAIL,
  payload: value,
});
export const enterFullName = (value) => ({
  type: types.ENTER_FULLNAME,
  payload: value,
});
export const enterPassword = (value) => ({
  type: types.ENTER_PASSWORD,
  payload: value,
});

export const logOut = () => ({
  type: types.LOGOUT,
})

export const userLogout = (userid) => dispatch => {
  return Axios.post('/logout', {id: userid})
  .then(() => dispatch(logOut()))
}